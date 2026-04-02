const express = require('express');
const { 
  getAllEvents, 
  getEventById, 
  createEvent, 
  updateEvent, 
  deleteEvent 
} = require('../controllers/eventController');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

const router = express.Router();

// GET routes are open to both roles
router.get('/', authenticate, getAllEvents);
router.get('/:id', authenticate, getEventById);

// Admin only routes
router.post('/', authenticate, authorize('Admin'), createEvent);
router.put('/:id', authenticate, authorize('Admin'), updateEvent);
router.delete('/:id', authenticate, authorize('Admin'), deleteEvent);

module.exports = router;
