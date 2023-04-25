const connection = require('./tryDB');

connection
  .then(() => console.log('success'))
  .catch((error) => {
    console.log('CATCHEDD');
    console.error(error);
    console.log('AFTER');
  });
