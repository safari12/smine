const express = require('express')

const handler = require('./handler')
const asyncHandler = require('../async/handler')
const token = require('../token')

const router = express.Router()

router
  .route('/')
  .get(token.check, asyncHandler(handler.getAll))
  .post([token.check, token.checkAdmin], asyncHandler(handler.add))

router
  .route('/:id')
  .delete([token.check, token.checkAdmin], asyncHandler(handler.remove))

module.exports = router
