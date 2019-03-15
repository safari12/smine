const express = require('express')
const handler = require('./handler')
const configRouter = require('./config/router')
const token = require('../token')

const router = express.Router()
router.use([token.check, token.checkAdmin])
router.route('/supported').get(handler.getSupported)
router.use('/configs', configRouter)

module.exports = router
