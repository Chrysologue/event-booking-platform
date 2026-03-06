const app = require('./app');
require('dotenv').config();
const { connectToDb } = require('./config/db');

const port = process.env.PORT;

connectToDb().then(() => {
  app.listen(port, console.log('Listening on port', port));
});
