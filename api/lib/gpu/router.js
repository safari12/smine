const CRUDHandler = require('express-crud-router').handler
const CRUDRouter = require('express-crud-router').router

const configRouter = require('./config/router')
const datasourceRouter = require('./datasource/router')

const model = require('.').model
const handler = new CRUDHandler(model)
const router = CRUDRouter(handler)

router.use('/configs', configRouter)
router.use('/datasources', datasourceRouter)

module.exports = router
