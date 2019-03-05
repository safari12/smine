const CRUDHandler = require('express-crud-router').handler
const CRUDRouter = require('express-crud-router').router

const model = require('.').model
const handler = new CRUDHandler(model)
const router = CRUDRouter(handler)

module.exports = router
