const cparser = require('./config/parser')
const logger = require('./logger')

const Datacenter = require('./datacenter')
const Notifications = require('./notifications')
const Mailer = require('./mailer')

module.exports = async (configPath) => {
  try {
    const config = cparser.readFile(configPath)
    const mailer = new Mailer(config.email)
    const datacenter = new Datacenter(config.discovery)
    const notifications = new Notifications(mailer)
    
    logger.info('config is valid')
    logger.info('getting rig stats')

    const stats = await datacenter.getStats()

    if (notifications.notifyOnlineStats(stats)) {
      logger.info('changes were detected for online rigs, notified recipients')
    } else {
      logger.info('no changes were detected for online rigs')
    }

    if (notifications.notifyOfflineStats(stats)) {
      logger.info('changes were detected for offline rigs, notified recipients')
    } else {
      logger.info('no changes were detected for offline rigs')
    }
  } catch(error) {
    logger.error(error)
  }
}
