const db = require('../config/db');
const { createEventSchema, updateEventSchema } = require('../validators/schemas');

exports.getAllEvents = async (req, res, next) => {
  try {
    const student_department = req.user ? req.user.department : null;

    let query = `
      SELECT e.event_id, e.title, e.description, e.date, e.venue, e.max_participants, e.category,
             COALESCE(v.current_registered, 0) AS total_registered,
             COALESCE(v.available_spots, e.max_participants) AS available_spots
      FROM Events e
      LEFT JOIN vw_event_capacity v ON e.event_id = v.event_id
      ORDER BY e.date ASC
    `;
    
    const [events] = await db.execute(query);

    res.status(200).json({
      success: true,
      data: events,
      message: 'Events fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

exports.getEventById = async (req, res, next) => {
  try {
    const eventId = req.params.id;
    const [events] = await db.execute(`
      SELECT e.event_id, e.title, e.description, e.date, e.venue, e.max_participants, e.category,
             COALESCE(v.current_registered, 0) AS total_registered,
             COALESCE(v.available_spots, e.max_participants) AS available_spots
      FROM Events e
      LEFT JOIN vw_event_capacity v ON e.event_id = v.event_id
      WHERE e.event_id = ?`,
      [eventId]
    );

    if (events.length === 0) {
      return res.status(404).json({ success: false, data: null, message: 'Event not found' });
    }

    res.status(200).json({
      success: true,
      data: events[0],
      message: 'Event fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

exports.createEvent = async (req, res, next) => {
  try {
    const { error, value } = createEventSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, data: null, message: error.details[0].message });
    }

    const { title, description, date, venue, max_participants, category } = value;

    const [result] = await db.execute(
      'INSERT INTO Events (title, description, date, venue, max_participants, category) VALUES (?, ?, ?, ?, ?, ?)',
      [title, description, date, venue, max_participants, category]
    );

    res.status(201).json({
      success: true,
      data: { event_id: result.insertId, ...value },
      message: 'Event created successfully'
    });
  } catch (error) {
    next(error);
  }
};

exports.updateEvent = async (req, res, next) => {
  try {
    const eventId = req.params.id;
    const { error, value } = updateEventSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, data: null, message: error.details[0].message });
    }

    const updates = [];
    const params = [];
    
    for (const [k, v] of Object.entries(value)) {
      updates.push(`${k} = ?`);
      params.push(v);
    }
    
    if (updates.length === 0) {
      return res.status(400).json({ success: false, data: null, message: 'No fields to update' });
    }
    
    params.push(eventId);
    
    const [result] = await db.execute(
      `UPDATE Events SET ${updates.join(', ')} WHERE event_id = ?`,
      params
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, data: null, message: 'Event not found' });
    }

    res.status(200).json({
      success: true,
      data: { event_id: eventId },
      message: 'Event updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteEvent = async (req, res, next) => {
  try {
    const eventId = req.params.id;
    const [result] = await db.execute('DELETE FROM Events WHERE event_id = ?', [eventId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, data: null, message: 'Event not found' });
    }

    res.status(200).json({
      success: true,
      data: null,
      message: 'Event deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
