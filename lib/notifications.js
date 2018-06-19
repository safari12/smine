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

  notifyOnlineStats(stats) {
    const diff = _.differenceBy(stats.onlineRigs, this.alreadyNotified.onlineRigs, 'name')

    if (diff.length > 0) {
      const totalOnlineHashrate = Rig.getTotalHashrate(stats.onlineRigs)
      const diffListContent = this.getListContent(diff)

      let content = '<h3>The following machines are online</h3>\n' + diffListContent
      content += `<h3>Total Hashrate: ${totalOnlineHashrate}</h3>`

      this.alreadyNotified.onlineRigs = stats.onlineRigs
      this.mailer.sendMail('Smine - Online Stats Update', content)

      return true
    }

    return false
  }

  notifyOfflineStats(stats) {
    const change = this.getOfflineRigChange(stats)

    if (change.length > 0) {
      const totalOfflineHashrate = Rig.getTotalHashrate(stats.offlineRigs)
      const totalOnlineHashrate = Rig.getTotalHashrate(stats.onlineRigs)

      const changeListContent = this.getListContent(change)
      let content = ''

      if (stats.offlineRigs.length < this.alreadyNotified.offlineRigs.length) {
        content += '<h3>The following machines were fixed</h3>\n' + changeListContent

        if (stats.offlineRigs.length > 0) {
          content += '<h3>The following machines are still offline</h3>\n' + this.getListContent(stats.offlineRigs)
        }
      }
      else if (stats.offlineRigs.length > this.alreadyNotified.offlineRigs.length) {
        content += '<h3>The following machines are offline</h3>\n' + this.getListContent(stats.offlineRigs)
      }

      content += `<h3>Total Hashrate: ${totalOnlineHashrate - totalOfflineHashrate}</h3>`
      content += `<h3>Total Hashrate Loss: -${totalOfflineHashrate}</h3>`

      this.alreadyNotified.offlineRigs = stats.offlineRigs
      this.mailer.sendMail('SMine - Offline Stats Update', content)

      return true
    }

    return false
  }

  getOfflineRigChange(stats) {
    const leftDiff = _.differenceBy(stats.offlineRigs, this.alreadyNotified.offlineRigs, 'name')
    const rightDiff = _.differenceBy(this.alreadyNotified.offlineRigs, stats.offlineRigs, 'name')

    return _.concat(leftDiff, rightDiff)
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
