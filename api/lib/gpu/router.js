const express = require('express')
const configRouter = require('./config/router')
const token = require('../token')

const router = express()
router.use([token.check, token.checkAdmin])
router.use('/configs', configRouter)

module.exports = router
