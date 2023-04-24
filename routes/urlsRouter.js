const express = require('express');
const controller = require('../controllers/urlsController');

console.log('AYOOOOOO 2');

const router = express.Router();

// define routes
router.get('/:id', controller.get);

router.post('/', controller.post);

module.exports = router;
