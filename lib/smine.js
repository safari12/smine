const cparser = require('./config/parser')
const logger = require('./logger')

const MinerNet = require('./miner/net')

module.exports = (configPath) => {
  const config = cparser.readFile(configPath)
  logger.info('config is valid :)')

  const minerNet = new MinerNet(config)
  logger.info('syncing stats')
  minerNet.syncStats().then((b) => {
    console.log(b)
  })
}
