const express = require('express')

const asyncHandler = require('../async/handler')
const handler = require('./handler')
const token = require('../token')

const router = express.Router()

router.use([token.check])
router.route('/supported').get(asyncHandler(handler.getSupported))
router.route('/api').put(token.checkAdmin, asyncHandler(handler.updateAPI))

module.exports = router
