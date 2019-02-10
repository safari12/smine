const express = require('express')

const asyncHandler = require('../async/handler')
const handler = require('./handler')
const token = require('../token')

const router = express.Router()

router.use([token.check])
router.route('/supported').get(handler.getSupported)
router
  .route('/:miner/configs')
  .post(token.checkAdmin, asyncHandler(handler.addConfig))
  .get(token.checkAdmin, asyncHandler(handler.getConfigs))

module.exports = router
