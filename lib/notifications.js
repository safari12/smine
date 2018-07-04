const _ = require('lodash')

const Rig = require('./rig')

const util = require('./util')

/**
 * Class representing notifications for bot
 */
class Notifications {

  /**
   * constructor
   * @param {Object} mailer 
   */
  constructor(mailer) {
    this.mailer = mailer
    this.alreadyNotified = {
      offlineRigs: [],
      onlineRigs: []
    }
  }

  /**
   * notifies recipients through email if anything 
   * has changed in datacenter stats from last seen
   * @param {Object} stats 
   */
  notifyStatsIfNeeded(stats) {
    const notifyOnlineRigs = this.getNewOnlineRigsToNotify(stats.onlineRigs)
    const notifyOfflineRigs = this.getNewOfflineRigsToNotify(stats.offlineRigs)
    const notifyFixedRigs = this.getFixedRigsToNotify(stats.offlineRigs)
    const totalOnlineHashrate = Rig.getTotalHashrate(stats.onlineRigs)
    const totalOfflineHashrate = Rig.getTotalHashrate(stats.offlineRigs)

    let content = ''

    if (notifyOnlineRigs.length > 0) {
      content += '<h3>The following rigs just became online</h3>\n' 
      content += this.getHTMLRigList(notifyOnlineRigs)
      this.alreadyNotified.onlineRigs = stats.onlineRigs
    }

    if (notifyOfflineRigs.length > 0) {
      content += '<h3>The following rigs just became offline</h3>\n' 
      content += this.getHTMLRigList(stats.offlineRigs)
      this.alreadyNotified.offlineRigs = stats.offlineRigs
    }

    if (notifyFixedRigs.length > 0) {
      content += '<h3>The following rigs are fixed and back online</h3>\n'
      content += this.getHTMLRigList(notifyFixedRigs)

      if (stats.offlineRigs.length > 0) {
        content += '<h3>The following rigs are still offline</h3>\n'
        content += this.getHTMLRigList(stats.offlineRigs)
      }

      this.alreadyNotified.offlineRigs = stats.offlineRigs
    }

    if (content.length > 0) {
      content += `<h3>Total Hashrate: ${util.getHumanReadableHashrate(totalOnlineHashrate)}</h3>`
      content += `<h3>Total Hashrate Loss: ${util.getHumanReadableHashrate(totalOfflineHashrate)}</h3>`

      this.mailer.sendMail('SMine - Stats Update', content)

      return true
    }

    return false
  }

  /**
   * returns new online rigs that hasn't been seen before
   * @param {Array} onlineRigs 
   */
  getNewOnlineRigsToNotify(onlineRigs) {
    return _.differenceBy(onlineRigs, this.alreadyNotified.onlineRigs, 'name')
  }

  /**
   * returns new offline rigs that hasn't been seen before
   * @param {Array} offlineRigs 
   */
  getNewOfflineRigsToNotify(offlineRigs) {
    return _.differenceBy(offlineRigs, this.alreadyNotified.offlineRigs, 'name')
  }

  /**
   * returns offline rigs that were fixed
   * @param {Array} offlineRigs 
   */
  getFixedRigsToNotify(offlineRigs) {
    return _.differenceBy(this.alreadyNotified.offlineRigs, offlineRigs, 'name')
  }

  /**
   * returns a html list tag content for rig names
   * @param {Array} rigs 
   */
  getHTMLRigList(rigs) {
    let content = '<ul>\n'

    _.each(rigs, (r) => {
      content += `<li>${r.name}</li>\n`
    })

    content += '</ul>\n'

    return content
  }
}

module.exports = Notifications
