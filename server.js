const express = require('express');
const cors = require('cors');
const urlRoute = require('./routes/urlsRouter');

const app = express(); // create the api level
app.use(cors(process.env.CORS));
// { origin: 'https://storage.googleapis.com' }

app.use(express.json()); // make express parse json
app.use(express.urlencoded({ extended: true }));
app.use('/', urlRoute);// attach router for every request
// listen to port decided by environment variable or default to 3000 if local
const port = process.env.PORT || 3000;

app.listen(port, () => console.log('server started'));
process
  .on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p);
  })
  .on('uncaughtException', (err) => {
    console.error(err, 'Uncaught Exception thrown');
  });
