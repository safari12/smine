const express = require('express')
const bodyParser = require('body-parser')

const userRouter = require('./user/router')
const adminRouter = require('./admin/router')
const rigRouter = require('./rig/router')
const minerRouter = require('./miner/router')
const gpuRouter = require('./gpu/router')

const handler = {
  error: {
    common: require('express-common').handlers.error.common,
    validation: require('./error/handler')
  }
}

const server = express()
server.use(bodyParser.json())
server.use(
  bodyParser.urlencoded({
    extended: true
  })
)

server.use('/users', userRouter)
server.use('/admin', adminRouter)
server.use('/rigs', rigRouter)
server.use('/miners', minerRouter)
server.use('/gpu', gpuRouter)

server.use([handler.error.validation, handler.error.common])

module.exports = server