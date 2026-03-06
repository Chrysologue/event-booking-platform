const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: { type: String, trim: true, required: true },
    email: { type: String, trim: true, lowercase: true, unique: true },
    password: { type: String, required: true, select: false },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('User', userSchema);
