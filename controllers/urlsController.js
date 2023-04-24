console.log('AYOOOOOO 3 START');

const nanoid = require('nanoid'); // nanoid instead of uuid because it uses capital letters like bit.ly
const db = require('../urlsDatabase');

console.log('AYOOOOOO 3 END');

const generateId = nanoid.customAlphabet('1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 7);

function isUrlValid(url) {
  const regEx = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  return !!url.match(regEx);
}

module.exports = {
  get: (req, res) => {
    const { id } = req.params;

    db.collection('urls')
      .findOne({ nanoid: id }, (err, result) => {
        if (err) throw err;

        const redirectUrl = result.long;
        res.redirect(redirectUrl);
      })
      .catch(() => { // if findOne didn't find
        res.status(404).json({ error: `id ${id} could not be found` });
      });
  },
  post: (req, res) => {
    const { url } = req.body;// get the long url from the body

    // internal validation of url to avoid overflowing the db
    if (!isUrlValid(url)) {
      res.status(400).json({ error: 'Invalid url request' });
      return;
    }

    // generate shortened url - 7 alphanumerics
    // collision probability for rate of 1K/hr is 1% after 2 weeks (rare enough for this project)
    const shorturl = generateId();

    db.collection('urls')
      .insertOne({ nanoid: shorturl, long: url })
      .then(() => {
        // shorturl = 'localhost:3000/' + shorturl
        res.status(200).json({ short: shorturl });
      })
      .catch(() => {
        res.status(500).json({ error: 'couldnt create new document' });
      });
  },
};
