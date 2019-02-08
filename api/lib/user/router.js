const express = require('express')

const handler = require('./handler')

const router = express.Router()
router.post('/login', handler.login)

module.exports = router
