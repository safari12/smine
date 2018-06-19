const _ = require('lodash')
const logger = require('../logger')

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
      const diffListContent = this.getListContent(diff)
      let content = ''

      if (stats.offline.length < this.alreadyNotified.offline.length) {
        content += '<p><b>The following machines were fixed<b></p>\n' + diffListContent

        if (stats.offline.length > 0) {
          content += '<p><b>The following machines are still offline<b></p>\n' + this.getListContent(stats.offline)
        }
      }
      else if (stats.offline.length > this.alreadyNotified.offline.length) {
        content += '<p><b>The following machines are offline<b></p>\n' + this.getListContent(stats.offline)
      }

      this.alreadyNotified.offline = stats.offline
      this.mailer.sendMail('SMine - Stats Update', content)

      logger.info('detected change in miner stats, notified recipients')
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
