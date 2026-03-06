const User = require('../models/User');
const bcrypt = require('bcryptjs');
const userController = {};
const jwt = require('jsonwebtoken');

//Register user
userController.register = async function (req, res) {
  try {
    const { username, password, email } = req.body;
    const isExisting = await User.findOne({ email }).select('+password');
    if (isExisting) {
      return res
        .status(409)
        .json({ error: 'Email already exists', success: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    const objectUser = user.toObject();
    delete objectUser.password;
    return res.status(201).json({
      message: 'User created successfully',
      user: objectUser,
      success: true,
    });
  } catch (e) {
    return res
      .status(500)
      .json({ error: 'Internal server error', success: false });
  }
};

//Login
userController.login = async function (req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(404).json({ error: 'User not found', success: false });
    }
    const isMatching = await bcrypt.compare(password, user.password);
    if (!isMatching) {
      return res
        .status(401)
        .json({ error: 'Invalid email or password', success: false });
    }

    const payload = {
      id: user._id,
      email: user.email,
      username: user.username,
    };
    const accessToken = jwt.sign(payload, process.env.JWT_TOKEN, {
      expiresIn: '1h',
    });
    res.cookie('token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000,
    });
    return res.status(200).json({
      message: 'Successfully logged in',
      user: payload,
      success: true,
    });
  } catch (e) {
    console.error(e)
    return res
      .status(500)
      .json({ error: 'Internal server error', success: false });
  }
};

userController.logout = function (req, res) {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  return res
    .status(200)
    .json({ message: 'Successfully logged out', success: true });
};

module.exports = userController;
