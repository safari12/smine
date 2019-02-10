const express = require('express')
const bodyParser = require('body-parser')

const config = require('./config')
const logger = require('./logger')

const userRouter = require('./user/router')
const adminRouter = require('./admin/router')
const rigRouter = require('./rig/router')
const minerRouter = require('./miner/router')

const errorHandler = require('./error/handler')

class Server {
  static listen() {
    return new Promise(resolve => {
      const server = express()
      const PORT = config.api.port

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

      server.use([errorHandler.validationError, errorHandler.defaultError])

      server.listen(PORT, () => {
        logger.info(`server is listening on port ${PORT}`)
        resolve()
      })
    })
  }
}

module.exports = Server
