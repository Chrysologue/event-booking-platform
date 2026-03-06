const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registration.controller');
const auth = require('../middleware/auth.middleware');
const error = require('../middleware/error.middleware');

router.post(
  '/events/:id',
  auth.verifyUser,
  error.handleAsyncError(registrationController.registerForEvent),
);
router.delete(
  '/events/:id',
  auth.verifyUser,
  error.handleAsyncError(registrationController.cancellRegistration),
);
router.get(
  '/my',
  auth.verifyUser,
  error.handleAsyncError(registrationController.getEventsRegisteredFor),
);

module.exports = router;
