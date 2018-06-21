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
    const totalHashrate = _.max([0, totalOnlineHashrate - totalOfflineHashrate])

    let content = ''

    if (notifyOnlineRigs.length > 0) {
      content += '<h3>The following rigs just became online</h3>\n' 
      content += this.getListContent(notifyOfflineRigs)
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
      content += `<h3>Total Hashrate: ${totalHashrate}</h3>`
      content += `<h3>Total Hashrate Loss: -${totalOfflineHashrate}</h3>`

      this.mailer.sendMail('SMine - Stats Update', content)

      return true
    }

    return false
  }

  notifyOnlineStats(stats) {
    const diff = _.differenceBy(stats.onlineRigs, this.alreadyNotified.onlineRigs, 'name')

    if (diff.length > 0) {
      const totalOnlineHashrate = Rig.getTotalHashrate(stats.onlineRigs)
      const diffListContent = this.getListContent(diff)

      let content = '<h3>The following rigs just became online</h3>\n' + diffListContent
      content += `<h3>Total Hashrate: ${totalOnlineHashrate}</h3>`

      this.alreadyNotified.onlineRigs = stats.onlineRigs
      this.mailer.sendMail('Smine - Stats Update', content)

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
        content += '<h3>The following rigs are back online</h3>\n' + changeListContent

        if (stats.offlineRigs.length > 0) {
          content += '<h3>The following rigs are still offline</h3>\n' + this.getListContent(stats.offlineRigs)
        }
      }
      else if (stats.offlineRigs.length > this.alreadyNotified.offlineRigs.length) {
        content += '<h3>The following rigs are offline</h3>\n' + this.getListContent(stats.offlineRigs)
      }

      content += `<h3>Total Hashrate: ${_.max([0, totalOnlineHashrate - totalOfflineHashrate])}</h3>`
      content += `<h3>Total Hashrate Loss: -${totalOfflineHashrate}</h3>`

      this.alreadyNotified.offlineRigs = stats.offlineRigs
      this.mailer.sendMail('SMine - Stats Update', content)

      return true
    }

    return false
  }

  getOfflineRigChange(stats) {
    const leftDiff = _.differenceBy(stats.offlineRigs, this.alreadyNotified.offlineRigs, 'name')
    const rightDiff = _.differenceBy(this.alreadyNotified.offlineRigs, stats.offlineRigs, 'name')

    return _.concat(leftDiff, rightDiff)
  }

  getNewOnlineRigsToNotify(onlineRigs) {
    return _.differenceBy(onlineRigs, this.alreadyNotified.onlineRigs)
  }

  getNewOfflineRigsToNotify(offlineRigs) {
    return _.differenceBy(offlineRigs, this.alreadyNotified.offlineRigs)
  }

  getFixedRigsToNotify(offlineRigs) {
    return _.differenceBy(this.alreadyNotified.offlineRigs, offlineRigs)
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
