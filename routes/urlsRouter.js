const express = require('express');
const controller = require('../controllers/urlsController');

const router = express.Router();

// define routes
router.get('/:id', controller.get);

router.post('/create', controller.post);

module.exports = router;
