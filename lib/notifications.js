const _ = require('lodash')

const Rig = require('./rig')

const util = require('./util')
const html = require('./html')

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
    this.alreadySeenBefore = []
    this.alreadyOfflineBefore = []
  }

  /**
   * notifies recipients through email if anything 
   * has changed in datacenter stats from last seen
   * @param {Object} stats 
   */
  notifyStatsIfNeeded(stats) {
    const totalOnlineHashrate = Rig.getTotalHashrate(stats.onlineRigs)
    const totalOfflineHashrate = Rig.getTotalHashrate(stats.offlineRigs)
    
    const newOnlineRigs = this.getNewOnlineRigsToNotify(stats.onlineRigs)
    const newOfflineRigs = this.getNewOfflineRigsToNotify(stats.offlineRigs)
    const fixedRigs = this.getFixedRigsToNotify(stats.offlineRigs)

    let content = ''

    if (newOnlineRigs.length > 0) {
      content += this.getEmailContentForRigs(
        newOnlineRigs,
        'The following rigs just became online'
      )
      this.alreadySeenBefore = _.concat(this.alreadySeenBefore, newOnlineRigs)
    }

    if (newOfflineRigs.length > 0) {
      content += this.getEmailContentForRigs(
        newOfflineRigs,
        'The following rigs just became offline'
      )
      this.alreadyOfflineBefore = newOfflineRigs
    }

    if (fixedRigs.length > 0) {
      content += this.getEmailContentForRigs(
        fixedRigs,
        'The following rigs are fixed and back online'
      )

      if (stats.offlineRigs.length > 0) {
        content += this.getEmailContentForRigs(
          stats.offlineRigs,
          'The following rigs are still offline'
        )
      }

      this.alreadyOfflineBefore = stats.offlineRigs
    }

    if (content.length > 0) {
      content += html.generateHeaderTag(
        3,
        `Total Hashrate: ${util.getHumanReadableHashrate(totalOnlineHashrate)}`
      )
      content += html.generateHeaderTag(
        3,
        `Total Hashrate Loss: ${util.getHumanReadableHashrate(totalOfflineHashrate)}`
      )

      this.mailer.sendMail('SMine - Stats Update', content)

      return true
    }

    return false
  }

  /**
   * returns email content for rig names
   * @param {Array} rigs 
   * @param {function} changeFunction 
   * @param {string} headline 
   */
  getEmailContentForRigs(rigs, headline) {
    const rigNames = _.map(rigs, _.property('name'))

    let content = ''

    if (rigNames.length > 0) {
      content += html.generateHeaderTag(3, headline)
      content += html.generateListTag(rigNames)
    }

    return content
  }

  /**
   * returns new online rigs that hasn't been seen before
   * @param {Array} onlineRigs 
   */
  getNewOnlineRigsToNotify(onlineRigs) {
    return _.differenceBy(onlineRigs, this.alreadySeenBefore, 'name')
  }

  /**
   * returns rigs that became offline
   * @param {Array} offlineRigs 
   */
  getNewOfflineRigsToNotify(offlineRigs) {
    return _.differenceBy(offlineRigs, this.alreadyOfflineBefore, 'name')
  }

  /**
   * returns offline rigs that were fixed
   * @param {Array} offlineRigs 
   */
  getFixedRigsToNotify(offlineRigs) {
    return _.differenceBy(this.alreadyOfflineBefore, offlineRigs, 'name')
  }
}

module.exports = Notifications
