const mongoose = require('mongoose');

// create connection to db
const uri = 'mongodb+srv://AAAAA:MON123GO45@cluster0.vutp909.mongodb.net/shortener';

const connection = new Promise((resolve, reject) => {
  mongoose.connect(uri);
  const db = mongoose.connection;
  db.on('error', (error) => {
    console.error(error);
    reject(error);
  });
  db.once('open', () => {
    console.log('connected to db');
    resolve(db);
  });
});

module.exports = connection;
