const Registration = require('../models/Registration');
const Event = require('../models/Event');
const mongoose = require('mongoose');
const registrationController = {};

registrationController.registerForEvent = async (req, res) => {
  try {
    const userId = req.user?.id;
    const eventId = req.params.id;

    const isExisting = await Registration.findOne({
      user: userId,
      event: eventId,
    });

    if (isExisting) {
      return res
        .status(409)
        .json({ error: 'Already registered for this event', success: false });
    }

    const event = await Event.findById(eventId);
    if (!event)
      return res.status(404).json({ error: 'Event not found', success: false });

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res
        .status(400)
        .json({ error: 'Invalid Event ID', success: false });
    }
    const registration = await Registration.create({
      user: userId,
      event: eventId,
    });

    return res.status(201).json({
      message: 'Successfully registered for the event',
      success: true,
      registration,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: 'Internal server error', success: false });
  }
};

registrationController.cancellRegistration = async (req, res) => {
  try {
    const userId = req.user?.id;
    const eventId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res
        .status(400)
        .json({ error: 'Invalid Event ID', success: false });
    }

    const registration = await Registration.findOneAndDelete({
      user: userId,
      event: eventId,
    });
    if (!registration) {
      return res
        .status(404)
        .json({ error: 'Registration not found', success: false });
    }

    return res
      .status(200)
      .json({ message: 'Registration succcessfully cancelled', success: true });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: 'Internal server error', success: false });
  }
};

registrationController.getEventsRegisteredFor = async (req, res) => {
  try {
    const userId = req.user?.id;
    const registeredEvents = await Registration.find({ user: userId }).populate(
      { path: 'event', select: 'title description date location' },
    );

    return res.status(200).json({ events: registeredEvents, success: true });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: 'Internal server error', success: false });
  }
};

module.exports = registrationController;
