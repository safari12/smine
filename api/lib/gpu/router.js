const express = require('express')

const router = express.Router()

const asyncHandler = require('../async/handler')
const handler = require('./handler')
const token = require('../token')

router.use([token.check, token.checkAdmin])
router
  .route('/configs')
  .post(asyncHandler(handler.addConfig))
  .get(asyncHandler(handler.getConfigs))

module.exports = router
