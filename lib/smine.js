const cparser = require('./config/parser')
const logger = require('./logger')

const MinerDiscovery = require('./miner/discovery')
const MinerNotification = require('./miner/notification')
const Mailer = require('./mailer')

module.exports = async (configPath) => {
  const config = cparser.readFile(configPath)
  const mailer = new Mailer(config.email)
  const minerDiscovery = new MinerDiscovery(config.discovery)
  const minerNotification = new MinerNotification(mailer)
  
  logger.info('config is valid')
  logger.info('syncing stats')

  const stats = await minerDiscovery.getStats()

  console.log(stats)

  minerNotification.notifyStats({
    online: [{
      name: 's-m-05',
      data: {
        hashrate: {
          highest: 5000
        }
      }
    }],
    offline: [{
      name: 's-m-04',
      data: {
        hashrate: {
          highest: 2000
        }
      }
    }]
  })
}
