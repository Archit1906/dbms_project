const bcrypt = require('bcrypt');
const db = require('../config/db');
const { generateToken } = require('../config/jwt');
const { registerSchema, loginSchema } = require('../validators/schemas');

exports.register = async (req, res, next) => {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, data: null, message: error.details[0].message });
    }

    const { name, email, password, department, year } = value;

    // Check if user exists
    const [existingUsers] = await db.execute('SELECT user_id FROM Users WHERE email = ?', [email]);
    if (existingUsers.length > 0) {
      return res.status(400).json({ success: false, data: null, message: 'User already exists with this email' });
    }

    // Hash password
    const saltRounds = 12;
    const password_hash = await bcrypt.hash(password, saltRounds);

    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      // Insert user
      const [userResult] = await connection.execute(
        'INSERT INTO Users (email, password_hash, role) VALUES (?, ?, ?)',
        [email, password_hash, 'Student']
      );

      const user_id = userResult.insertId;

      // Insert student
      const [studentResult] = await connection.execute(
        'INSERT INTO Students (user_id, name, department, year) VALUES (?, ?, ?, ?)',
        [user_id, name, department, year]
      );

      await connection.commit();

      res.status(201).json({
        success: true,
        data: { student_id: studentResult.insertId, name, email },
        message: 'Registration successful'
      });
    } catch (dbError) {
      await connection.rollback();
      throw dbError;
    } finally {
      connection.release();
    }
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, data: null, message: error.details[0].message });
    }

    const { email, password } = value;

    // Output all rows for email
    const [users] = await db.execute(`
      SELECT 
        u.user_id, u.email, u.password_hash, u.role, 
        s.student_id, s.name, s.department, s.year 
      FROM Users u
      LEFT JOIN Students s ON u.user_id = s.user_id
      WHERE u.email = ?`,
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({ success: false, data: null, message: 'Invalid email or password' });
    }

    const user = users[0];

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ success: false, data: null, message: 'Invalid email or password' });
    }

    const payload = {
      user_id: user.user_id,
      student_id: user.student_id || null, // null for Admin
      email: user.email,
      role: user.role
    };

    const token = generateToken(payload);

    res.status(200).json({
      success: true,
      data: {
        token,
        user: {
          user_id: user.user_id,
          student_id: user.student_id,
          name: user.name || (user.role === 'Admin' ? 'Administrator' : null),
          email: user.email,
          department: user.department,
          year: user.year,
          role: user.role
        }
      },
      message: 'Login successful'
    });
  } catch (error) {
    next(error);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    const email = req.user.email;
    const [users] = await db.execute(`
      SELECT 
        u.user_id, u.email, u.role, u.created_at,
        s.student_id, s.name, s.department, s.year 
      FROM Users u
      LEFT JOIN Students s ON u.user_id = s.user_id
      WHERE u.email = ?`,
      [email]
    );

    if (users.length === 0) {
      return res.status(404).json({ success: false, data: null, message: 'User not found' });
    }

    const user = users[0];

    res.status(200).json({
      success: true,
      data: {
        user_id: user.user_id,
        student_id: user.student_id,
        name: user.name || (user.role === 'Admin' ? 'Administrator' : null),
        email: user.email,
        department: user.department,
        year: user.year,
        role: user.role,
        created_at: user.created_at
      },
      message: 'Profile fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};
