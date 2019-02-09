// const schedule = require('node-schedule')

// const cparser = require('./config/parser')
// const logger = require('./logger')

// const Datacenter = require('./datacenter')
// const Notifications = require('./notifications')
// const Mailer = require('./mailer')

const db = require('./db')
const admin = require('./admin')
const server = require('./server')
const farm = require('./farm')

module.exports = async () => {
  if ((await db.connect()) && (await admin.create())) {
    server.listen()
    console.log(await farm.syncRigs())
  }

  // let config

  // try {
  //   config = cparser.readFile(configPath)
  // } catch(error) {
  //   logger.error(error)
  //   process.exit(1)
  // }

  // try {
  //   logger.info('config is valid')

  //   const mailer = new Mailer(config.email)
  //   const datacenter = new Datacenter(config.discovery)
  //   const notifications = new Notifications(mailer)

  //   schedule.scheduleJob('*/1 * * * *', async () => {
  //     logger.info('getting rig stats')

  //     const stats = await datacenter.getStats()

  //     if (notifications.notifyStatsIfNeeded(stats)) {
  //       logger.info('changes were detected in stats, notified recipients')
  //     } else {
  //       logger.info('no changes were detected for stats')
  //     }
  //   })
  // } catch(error) {
  //   logger.error(error)
  // }
}
