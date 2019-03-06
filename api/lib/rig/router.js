const express = require('express')

const handler = require('./handler')
const asyncHandler = require('../async/handler')

const router = express.Router()

router
  .route('/')
  .get(asyncHandler(handler.getAll))
  .post(asyncHandler(handler.add))

router.route('/:id').delete(asyncHandler(handler.remove))

module.exports = router
