const Event = require('../models/Event');
const mongoose = require('mongoose');
const eventController = {};

eventController.getAllEvents = async function (req, res) {
  try {
    const events = await Event.find();
    return res
      .status(200)
      .json({ message: 'Events returned', events, success: true });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: 'Internal server error', success: false });
  }
};

eventController.getSingleEvent = async function (req, res) {
  try {
    const eventId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res
        .status(400)
        .json({ error: 'Invalid event ID', success: false });
    }
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found', success: false });
    }

    return res
      .status(200)
      .json({ message: 'Event successfully retrieved', success: true, event });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: 'Internal server error', success: false });
  }
};

//Authentication required

eventController.createEvent = async function (req, res) {
  try {
    const userId = req.user?.id;
    console.log(req.body)
    const { title, description, date, location } = req.body;
    const event = await Event.create({
      title,
      description,
      date,
      location,
      createdBy: userId,
    });

    return res
      .status(201)
      .json({ message: 'Event is successfully created', success: true, event });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: 'Internal server error', success: false });
  }
};

eventController.updateEvent = async function (req, res) {
  try {
    const eventId = req.params.id;
    const userId = req.user?.id;

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res
        .status(400)
        .json({ error: 'Invalid event ID', success: false });
    }

    const updatedData = {
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      location: req.body.location,
    };

    Object.keys(updatedData).forEach((key) => {
      updatedData[key] === undefined && delete updatedData[key];
    });

    const event = await Event.findOneAndUpdate(
      { _id: eventId, createdBy: userId },
      { $set: updatedData },
      { new: true, runValidators: true },
    );
    if (!event) {
      return res.status(404).json({ error: 'Event not found', success: false });
    }
    return res
      .status(200)
      .json({ message: 'Event successfully updated', success: true, event });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: 'Internal server error', success: false });
  }
};

eventController.deleteEvent = async function (req, res) {
  try {
    const eventId = req.params.id;
    const userId = req.user?.id;

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res
        .status(400)
        .json({ error: 'Invalid event ID', success: false });
    }
    const event = await Event.findOneAndDelete({
      _id: eventId,
      createdBy: userId,
    });
    if (!event) {
      return res.status(404).json({ error: 'Event not found', success: false });
    }

    return res
      .status(200)
      .json({ message: 'Event successfully deleted', success: true });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: 'Internal server error', success: false });
  }
};

module.exports = eventController;
