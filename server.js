const express = require('express');
const cors = require('cors');
const urlRoute = require('./routes/urlsRouter');

const app = express(); // create the api level
app.use(cors({
  origin: 'https://storage.googleapis.com',
})); // fix bug "Acess to fetch has been block by CORS policy sponse to preflight..."

app.use(express.json()); // make express parse json
app.use(express.urlencoded({ extended: true }));
app.use('/', urlRoute);// attach router for every request
// listen to port decided by environment variable or default to 3000 if local
const port = process.env.PORT || 3000;
app.listen(port, () => console.log('server started'));
