const cparser = require('./config/parser')
const logger = require('./logger')

const MinerService = require('./miner/service')

module.exports = (configPath) => {
  const config = cparser.readFile(configPath)
  
  logger.info('config is valid :)')
  logger.info('syncing stats')

  const minerService = new MinerService(config.discovery)
  minerService.syncStats().then((stats) => {
    console.log(stats)
  })
}
