const db = require('../config/db');

exports.getDepartmentStats = async (req, res, next) => {
  try {
    const [stats] = await db.execute('SELECT * FROM vw_department_stats');
    res.status(200).json({
      success: true,
      data: stats,
      message: 'Department stats fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};
