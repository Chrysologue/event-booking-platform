const mongoose = require('mongoose');
require('dotenv').config();

async function connectToDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    cosole.log('Successsfully connected to Database');
  } catch (err) {
    console.error('Failed to connect to database', err);
  }
}

module.exports = { connectToDb };
