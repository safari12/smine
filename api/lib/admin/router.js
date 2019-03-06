const express = require('express')

const handler = require('./handler')
const asyncHandler = require('../async/handler')

const router = express.Router()
router.post('/users', asyncHandler(handler.addUser))

module.exports = router
