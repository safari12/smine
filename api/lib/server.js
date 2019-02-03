const express = require('express')
const bodyParser = require('body-parser')

const config = require('./config')
const logger = require('./logger')

const userRouter = require('./user/router')

class Server {
  static listen() {
    const server = express()
    const PORT = config.api.port

    server.use(bodyParser.json())
    server.use(bodyParser.urlencoded({ extended: true }))
    server.use('/users', userRouter)

    server.listen(PORT, () => {
      logger.info(`server is listening on port ${PORT}`)
    })
  }
}

module.exports = Server
