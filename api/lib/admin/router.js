const express = require('express')

const handler = require('./handler')
const asyncHandler = require('../async/handler')
const token = require('../token')

const router = express.Router()
router.use([token.check, token.checkAdmin])
router.post('/users', asyncHandler(handler.addUser))

module.exports = router
