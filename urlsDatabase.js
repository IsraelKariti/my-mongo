const mongoose = require('mongoose');

// create connection to db
const uri = 'mongodb+srv://israelkariti:dbBD7aTTxFdR2kdb@cluster0.b6lcjql.mongodb.net/shortener';
mongoose.connect(uri);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to db'));

module.exports = db;
