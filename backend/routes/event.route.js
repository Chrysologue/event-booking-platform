const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event.controller');
const auth = require('../middleware/auth.middleware');
const error = require('../middleware/error.middleware');

router.post(
  '/events',
  auth.verifyUser,
  error.handleAsyncError(eventController.createEvent),
);
router.get('/events', error.handleAsyncError(eventController.getAllEvents));
router.get(
  '/events/:id',
  error.handleAsyncError(eventController.getSingleEvent),
);
router.put(
  '/events/:id',
  auth.verifyUser,
  error.handleAsyncError(eventController.updateEvent),
);
router.delete(
  '/events/:id',
  auth.verifyUser,
  error.handleAsyncError(eventController.deleteEvent),
);

module.exports = router;
