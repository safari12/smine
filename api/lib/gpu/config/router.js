const CRUDHandler = require('express-crud-router').handler
const CRUDRouter = require('express-crud-router').router

const token = require('../../token')

const model = require('.').model
const handler = new CRUDHandler(model)
const router = CRUDRouter(handler, {
  middlewares: {
    get: [token.check],
    all: [token.check, token.checkAdmin]
  }
})

module.exports = router
