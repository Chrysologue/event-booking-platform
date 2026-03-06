const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const userRoute = require('./routes/user.route');
const eventRoute = require('./routes/event.route');
const registrationRoute = require('./routes/register.route');

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', userRoute);
app.use('/api', eventRoute);
app.use('/api/registrations', registrationRoute);

app.get('/', (req, res) => {
  res.status(200).json('This is Event Booking Platform Backend');
});

app.use((req, res, next) => {
  next({ status: 404, message: 'Not found' });
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const errMessage = status === 404 ? err.message : 'Internal server error';
  res.status(status).json({ error: errMessage, success: false });
});

module.exports = app;
