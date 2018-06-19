const _ = require('lodash')
const logger = require('../logger')

const Miner = require('./index')

class MinerNotification {
  constructor(mailer) {
    this.mailer = mailer
    this.alreadyNotified = {
      offline: []
    }
  }

  notifyStats(stats) {
    const diff = this.diffFromBothSides(stats)

    if (diff.length > 0) {
      logger.info('detected change in miner stats, notifying recipients')

      const totalOfflineHashrate = Miner.getTotalHashrate(stats.offline)
      const totalOnlineHashrate = Miner.getTotalHashrate(stats.online)

      const diffListContent = this.getListContent(diff)
      let content = ''

      if (stats.offline.length < this.alreadyNotified.offline.length) {
        content += '<h3>The following machines were fixed</h3>\n' + diffListContent

        if (stats.offline.length > 0) {
          content += '<h3>The following machines are still offline</h3>\n' + this.getListContent(stats.offline)
        }
      }
      else if (stats.offline.length > this.alreadyNotified.offline.length) {
        content += '<h3>The following machines are offline</h3>\n' + this.getListContent(stats.offline)
      }

      content += `<h3>Total Hashrate: ${totalOnlineHashrate - totalOfflineHashrate}</h3>`
      content += `<h3>Total Hashrate Loss: -${totalOfflineHashrate}</h3>`

      this.alreadyNotified.offline = stats.offline
      this.mailer.sendMail('SMine - Stats Update', content)
        .then(() => {
          logger.info('successfully notified recipients')
        })
        .catch((error) => {
          logger.error('error, could\'t notified recipients: ' + error.message)
        })
    }
    else {
      logger.info('no changes detected in miner stats')
    }
  }

  diffFromBothSides(stats) {
    const leftDiff = _.differenceBy(stats.offline, this.alreadyNotified.offline, 'name')
    const rightDiff = _.differenceBy(this.alreadyNotified.offline, stats.offline, 'name')

    return _.concat(leftDiff, rightDiff)
  }

  getListContent(miners) {
    let content = '<ul>\n'

    _.each(miners, (m) => {
      content += `<li>${m.name}</li>\n`
    })

    content += '</ul>\n'

    return content
  }
}

module.exports = MinerNotification
