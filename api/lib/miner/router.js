const express = require('express')

const asyncHandler = require('../async/handler')
const handler = require('./handler')

const router = express.Router()

router.route('/supported').get(handler.getSupported)

router
  .route('/:miner/configs')
  .post(asyncHandler(handler.addConfig))
  .get(asyncHandler(handler.getConfigs))

module.exports = router
