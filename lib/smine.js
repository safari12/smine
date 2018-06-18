const cparser = require('./config/parser')
const logger = require('./logger')

const MinerDiscovery = require('./miner/discovery')
const Mailer = require('./mailer')

module.exports = (configPath) => {
  const config = cparser.readFile(configPath)
  const discovery = config.discovery
  const email = config.email

  const mailer = new Mailer(email)
  
  logger.info('config is valid')
  logger.info('syncing stats')

  const minerDiscovery = new MinerDiscovery(
    discovery.number_of_miners,
    discovery.hostname,
    discovery.api
  )

  minerDiscovery.getStats().then((stats) => {
    console.log(stats)
  })

  logger.info('sending mail')

  mailer.sendMail('smine', '<b>Hello World<b>')
    .then(() => {
      console.log('successfully send mail')
    })
    .catch((err) => {
      console.log(err.message)
    })
}
