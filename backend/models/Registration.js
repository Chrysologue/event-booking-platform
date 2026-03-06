const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    event: { type: mongoose.Schema.ObjectId, required: true, ref: 'Event' },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('Registration', registrationSchema);
