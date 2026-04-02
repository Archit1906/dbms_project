const db = require('../config/db');
const { updateRegistrationStatusSchema } = require('../validators/schemas');

exports.registerForEvent = async (req, res, next) => {
  const connection = await db.getConnection();
  try {
    const { event_id } = req.body;
    const student_id = req.user.student_id;

    if (!event_id) {
      return res.status(400).json({ success: false, data: null, message: 'event_id is required' });
    }

    await connection.beginTransaction();

    // Check capacity using locking to prevent race conditions
    const [events] = await connection.execute(`
      SELECT max_participants FROM Events 
      WHERE event_id = ? FOR UPDATE`, 
      [event_id]
    );

    if (events.length === 0) {
      await connection.rollback();
      return res.status(404).json({ success: false, data: null, message: 'Event not found' });
    }

    const { max_participants } = events[0];

    const [regs] = await connection.execute(`
      SELECT COUNT(*) as current_registered FROM Registrations 
      WHERE event_id = ? AND status IN ('Registered', 'Present') FOR UPDATE`,
      [event_id]
    );

    const current_registered = regs[0].current_registered;

    if (current_registered >= max_participants) {
      // Fallback to waitlist
      const [waitlistCount] = await connection.execute(
        'SELECT COUNT(*) as waitlist_count FROM Waitlist WHERE event_id = ?',
        [event_id]
      );
      const priority = waitlistCount[0].waitlist_count + 1;

      try {
        await connection.execute(
          'INSERT INTO Waitlist (student_id, event_id, priority_number) VALUES (?, ?, ?)',
          [student_id, event_id, priority]
        );
        await connection.commit();
        
        // Emit waitlist updated
        const io = req.app.get('socketio');
        if (io) {
          io.emit('waitlist_updated', { event_id, student_id, priority });
        }

        return res.status(201).json({
          success: true,
          data: { status: 'Waitlist', priority, student_id, event_id },
          message: 'Event is full. You have been added to the waitlist.'
        });
      } catch (waitlistErr) {
        await connection.rollback();
        if (waitlistErr.code === 'ER_DUP_ENTRY') {
           return res.status(400).json({ success: false, data: null, message: 'You are already on the waitlist for this event' });
        }
        throw waitlistErr;
      }
    }

    // Register
    try {
      const [result] = await connection.execute(
        'INSERT INTO Registrations (student_id, event_id, status) VALUES (?, ?, ?)',
        [student_id, event_id, 'Registered']
      );
      
      await connection.commit();

      const io = req.app.get('socketio');
      if (io) {
        io.emit('registration_updated', { event_id, current_registered: current_registered + 1, max_participants });
      }

      res.status(201).json({
        success: true,
        data: { reg_id: result.insertId, student_id, event_id },
        message: 'Successfully registered for event'
      });
    } catch (dbError) {
      await connection.rollback();
      if (dbError.code === 'ER_DUP_ENTRY') {
         return res.status(400).json({ success: false, data: null, message: 'You are already registered for this event' });
      }
      throw dbError;
    }

  } catch (error) {
    if (connection) await connection.rollback();
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

exports.getMyRegistrations = async (req, res, next) => {
  try {
    const student_id = req.user.student_id;
    const [registrations] = await db.execute(`
      SELECT r.reg_id, r.timestamp as registration_date, r.status, 
             e.event_id, e.title, e.date, e.venue 
      FROM Registrations r
      JOIN Events e ON r.event_id = e.event_id
      WHERE r.student_id = ?
      ORDER BY e.date ASC`,
      [student_id]
    );

    res.status(200).json({
      success: true,
      data: registrations,
      message: 'Registrations fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

exports.getEventParticipants = async (req, res, next) => {
  try {
    const event_id = req.params.id;
    const [participants] = await db.execute(`
      SELECT r.reg_id, r.timestamp as registration_date, r.status,
             s.student_id, s.name, u.email, s.department, s.year
      FROM Registrations r
      JOIN Students s ON r.student_id = s.student_id
      JOIN Users u ON s.user_id = u.user_id
      WHERE r.event_id = ?
      ORDER BY s.name ASC`,
      [event_id]
    );

    res.status(200).json({
      success: true,
      data: participants,
      message: 'Participants fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

exports.updateParticipationStatus = async (req, res, next) => {
  const connection = await db.getConnection();
  try {
    const reg_id = req.params.id;
    const { error, value } = updateRegistrationStatusSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, data: null, message: error.details[0].message });
    }

    const { status } = value;

    await connection.beginTransaction();

    const [regData] = await connection.execute(`
      SELECT e.event_id, r.student_id, r.status as current_status FROM Registrations r
      JOIN Events e ON r.event_id = e.event_id
      WHERE r.reg_id = ? FOR UPDATE`,
      [reg_id]
    );

    if (regData.length === 0) {
      await connection.rollback();
      return res.status(404).json({ success: false, data: null, message: 'Registration not found' });
    }

    const { event_id, current_status } = regData[0];

    // Note: status update could also create Certificate via Trigger 'after_attendance_marked'
    const [result] = await connection.execute(
      'UPDATE Registrations SET status = ? WHERE reg_id = ?',
      [status, reg_id]
    );

    // If cancelled, check waitlist
    if (status === 'Cancelled' && current_status !== 'Cancelled') {
      const [waitlistTop] = await connection.execute(`
        SELECT waitlist_id, student_id FROM Waitlist
        WHERE event_id = ? ORDER BY priority_number ASC LIMIT 1 FOR UPDATE
      `, [event_id]);

      if (waitlistTop.length > 0) {
        const nextStudent = waitlistTop[0].student_id;
        const waitlist_id = waitlistTop[0].waitlist_id;

        // Move to registrations
        await connection.execute(`
           INSERT INTO Registrations (student_id, event_id, status) VALUES (?, ?, ?)
        `, [nextStudent, event_id, 'Registered']);

        // Remove from waitlist
        await connection.execute(`DELETE FROM Waitlist WHERE waitlist_id = ?`, [waitlist_id]);
      }
      
      const [regs] = await connection.execute(`
        SELECT COUNT(*) as current_registered FROM Registrations 
        WHERE event_id = ? AND status IN ('Registered', 'Present') FOR UPDATE`,
        [event_id]
      );
      
      const io = req.app.get('socketio');
      if (io) {
        io.emit('registration_updated', { event_id, current_registered: regs[0].current_registered });
      }
    }

    await connection.commit();

    res.status(200).json({
      success: true,
      data: { reg_id, status },
      message: 'Status updated successfully'
    });
  } catch (error) {
    if (connection) await connection.rollback();
    next(error);
  } finally {
    if (connection) connection.release();
  }
};
