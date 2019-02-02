const mongoose = require('mongoose')

const config = require('./config')
const logger = require('./logger')

class DB {
  static async connect() {
    try {
      const uri = `mongodb://${config.db.hostname}:${config.db.port}/${config.db.name}`

      await mongoose.connect(uri, this.getOptions())

      logger.info('db connected!')

      return true
    } catch (error) {
      logger.error('db failed to connect')
      logger.error(error)

      return false
    }
  }

  static getOptions() {
    const username = config.db.username
    const password = config.db.password

    let options = {
      useNewUrlParser: true
    }

    if (username && password) {
      options.user = username
      options.pass = password
    }

    return options
  }
}

module.exports = DB