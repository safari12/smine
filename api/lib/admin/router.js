const express = require('express')

const handler = require('./handler')
const token = require('../token')

const router = express.Router()
router.use([token.check, token.checkAdmin])
router.post('/users', handler.addUser)

module.exports = router
