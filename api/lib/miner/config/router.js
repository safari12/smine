const CRUDHandler = require('express-crud').handler
const CRUDRouter = require('express-crud').router

const model = require('.').model
const handler = new CRUDHandler(model)
const router = CRUDRouter(handler)

module.exports = router