const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const adminController = require('../controllers/adminController');

router.get('/reports/department-stats', authenticate, adminController.getDepartmentStats);

module.exports = router;
