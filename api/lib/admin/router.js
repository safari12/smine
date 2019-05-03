const express = require('express')
const asyncHandler = require('express-common').handlers.async

const handler = require('./handler')

const router = express.Router()
router.post('/users', asyncHandler(handler.addUser))

module.exports = router