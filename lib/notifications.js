const _ = require('lodash')

const Rig = require('./rig')

class Notifications {
  constructor(mailer) {
    this.mailer = mailer
    this.alreadyNotified = {
      offlineRigs: [],
      onlineRigs: []
    }
  }

  notifyStatsIfNeeded(stats) {
    const notifyOnlineRigs = this.getNewOnlineRigsToNotify(stats.onlineRigs)
    const notifyOfflineRigs = this.getNewOfflineRigsToNotify(stats.offlineRigs)
    const notfiyFixedRigs = this.getFixedRigsToNotify(stats.offlineRigs)
    const totalOnlineHashrate = Rig.getTotalHashrate(stats.onlineRigs)
    const totalOfflineHashrate = Rig.getTotalHashrate(stats.offlineRigs)

    let content = ''

    if (notifyOnlineRigs.length > 0) {
      content += '<h3>The following rigs just became online</h3>\n' 
      content += this.getListContent(notifyOnlineRigs)
      this.alreadyNotified.onlineRigs = stats.onlineRigs
    }

    if (notifyOfflineRigs.length > 0) {
      content += '<h3>The following rigs just became offline</h3>\n' 
      content += this.getListContent(stats.offlineRigs)
      this.alreadyNotified.offlineRigs = stats.offlineRigs
    }

    if (notfiyFixedRigs.length > 0) {
      content += '<h3>The following rigs are fixed and back online</h3>\n'
      content += this.getListContent(notfiyFixedRigs)
      this.alreadyNotified.offlineRigs = stats.offlineRigs
    }

    if (content.length > 0) {
      content += `<h3>Total Hashrate: ${totalOnlineHashrate}</h3>`
      content += `<h3>Total Hashrate Loss: ${totalOfflineHashrate}</h3>`

      this.mailer.sendMail('SMine - Stats Update', content)

      return true
    }

    return false
  }

  getNewOnlineRigsToNotify(onlineRigs) {
    return _.differenceBy(onlineRigs, this.alreadyNotified.onlineRigs, 'name')
  }

  getNewOfflineRigsToNotify(offlineRigs) {
    return _.differenceBy(offlineRigs, this.alreadyNotified.offlineRigs, 'name')
  }

  getFixedRigsToNotify(offlineRigs) {
    return _.differenceBy(this.alreadyNotified.offlineRigs, offlineRigs, 'name')
  }

  getListContent(rigs) {
    let content = '<ul>\n'

    _.each(rigs, (r) => {
      content += `<li>${r.name}</li>\n`
    })

    content += '</ul>\n'

    return content
  }
}

module.exports = Notifications
