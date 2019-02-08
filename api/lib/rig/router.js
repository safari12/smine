const express = require('express')

const handler = require('./handler')
const token = require('../token')

const router = express.Router()

router
  .route('/')
  .get(token.check, handler.getAll)
  .post([token.check, token.checkAdmin], handler.add)

module.exports = router
