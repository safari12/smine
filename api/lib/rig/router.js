const expressCrud = require('express-crud')
const CRUDHandler = expressCrud.handler
const CRUDRouter = expressCrud.router
const token = require('../token')

const model = require('.')
const handler = new CRUDHandler(model, {
  populate: ['gpu.config', 'miners.config']
})
const router = CRUDRouter(handler, {
  middlewares: {
    get: [token.check],
    all: [token.check, token.checkAdmin]
  }
})

module.exports = router