const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const error = require('../middleware/error.middleware');
const auth = require('../middleware/auth.middleware');

router.post('/register', error.handleAsyncError(userController.register));
router.post('/login', error.handleAsyncError(userController.login));
router.post(
  '/logout',
  auth.verifyUser,
  error.handleAsyncError(userController.logout),
);
router.get('/me', auth.verifyUser, (req, res) => {
  const user = req.user;
  return res.status(200).json({ success: true, user });
});

module.exports = router;
