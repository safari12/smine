const express = require('express');
const handler = require('./handler');

const router = express.Router();
router.route('/supported').get(handler.getSupported);

module.exports = router;
