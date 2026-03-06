const Auth = {};
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const User = require('../models/User');


Auth.verifyUser = async function (req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: 'Token missing', success: false });
    }

    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
      return res
        .status(401)
        .json({ error: 'Invalid or expired token', success: false });
    }
    return res
      .status(500)
      .json({ error: 'Internal server error', success: false });
  }
};

module.exports = Auth;
