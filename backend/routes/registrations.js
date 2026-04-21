const express = require('express');
const { 
  registerForEvent, 
  getMyRegistrations, 
  getEventParticipants, 
  updateParticipationStatus,
  getAllRegistrations
} = require('../controllers/registrationController');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

const router = express.Router();

// Student routes
router.post('/', authenticate, registerForEvent);
router.get('/my', authenticate, getMyRegistrations);

// Admin routes
router.get('/event/:id', authenticate, authorize('Admin'), getEventParticipants);
router.patch('/:id/status', authenticate, authorize('Admin'), updateParticipationStatus);
router.get('/all', authenticate, authorize('Admin'), getAllRegistrations);

module.exports = router;
