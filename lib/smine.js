const cparser = require('./config/parser')
const logger = require('./logger')

const MinerDiscovery = require('./miner/discovery')

module.exports = (configPath) => {
  const config = cparser.readFile(configPath)
  
  logger.info('config is valid :)')
  logger.info('syncing stats')

  const discovery = config.discovery
  const minerService = new MinerDiscovery(
    discovery.number_of_miners,
    discovery.hostname,
    discovery.api
  )

  minerService.getStats().then((stats) => {
    console.log(stats)
  })
}
