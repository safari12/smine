const cparser = require('./config/parser')
const logger = require('./logger')

module.exports = (configPath) => {
  const config = cparser.readFile(configPath)
  logger.info('config is valid :)')
  logger.info(JSON.stringify(config))
}
