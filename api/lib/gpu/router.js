const CRUDHandler = require('express-crud-router').handler
const CRUDRouter = require('express-crud-router').router

const configRouter = require('./config/router')
const datasourceRouter = require('./datasource/router')
const token = require('../token')

const model = require('.').model
const handler = new CRUDHandler(model)
const router = CRUDRouter(handler, {
  middlewares: {
    get: [token.check],
    all: [token.check, token.checkAdmin]
  }
})

router.use('/configs', configRouter)
router.use('/datasources', datasourceRouter)

module.exports = router
