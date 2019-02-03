const express = require('express')
const bodyParser = require('body-parser')

const config = require('./config')
const logger = require('./logger')

class Server {
  static listen() {
    const server = express()
    const PORT = config.api.port

    server.use(bodyParser.json())
    server.use(bodyParser.urlencoded({ extended: true }))

    server.get('/hello-world', (req, res) => {
      res.json({
        message: 'hello world'
      })
    })

    server.listen(PORT, () => {
      logger.info(`server is listening on port ${PORT}`)
    })
  }
}

module.exports = Server
