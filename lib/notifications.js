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
    const totalOnlineHashrate = Rig.getTotalHashrate(stats.onlineRigs)
    const totalOfflineHashrate = Rig.getTotalHashrate(stats.offlineRigs)

    let content = ''

    content += this.getEmailContentIfAnyRigsChanged(
      stats.onlineRigs,
      this.getNewOnlineRigsToNotify,
      'The following rigs just became online'
    )

    content += this.getEmailContentIfAnyRigsChanged(
      stats.offlineRigs,
      this.getNewOfflineRigsToNotify,
      'The following rigs just became offline'
    )

    const fixedRigContent = this.getEmailContentIfAnyRigsChanged(
      this.offlineRigs,
      this.getFixedRigsToNotify,
      'The following rigs are fixed and back online'
    )

    if (fixedRigContent.length > 0 && stats.offlineRigs.length > 0) {
      content += html.generateHeaderTag(3, 'The following rigs are still offline')
      content += html.generateListTag(
        _.map(stats.offlineRigs, _.property('name'))
      )
    }

    content += fixedRigContent

    this.alreadyNotified.onlineRigs = stats.onlineRigs
    this.alreadyNotified.offlineRigs = stats.offlineRigs

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
   * returns email content if the change function 
   * returns any rigs that changed
   * @param {Array} rigs 
   * @param {function} changeFunction 
   * @param {string} headline 
   */
  getEmailContentIfAnyRigsChanged(rigs, changeFunction, headline) {
    const changedRigs = changeFunction(rigs, this.alreadyNotified)
    const changedRigNames = _.map(changedRigs, _.property('name'))

    let content = ''

    if (changedRigNames.length > 0) {
      content += html.generateHeaderTag(3, headline)
      content += html.generateListTag(changedRigNames)
    }

    return content
  }

  /**
   * returns new online rigs that hasn't been seen before
   * @param {Array} onlineRigs 
   */
  getNewOnlineRigsToNotify(onlineRigs, alreadyNotified) {
    return _.differenceBy(onlineRigs, alreadyNotified.onlineRigs, 'name')
  }

  /**
   * returns new offline rigs that hasn't been seen before
   * @param {Array} offlineRigs 
   */
  getNewOfflineRigsToNotify(offlineRigs, alreadyNotified) {
    return _.differenceBy(offlineRigs, alreadyNotified.offlineRigs, 'name')
  }

  /**
   * returns offline rigs that were fixed
   * @param {Array} offlineRigs 
   */
  getFixedRigsToNotify(offlineRigs, alreadyNotified) {
    return _.differenceBy(alreadyNotified.offlineRigs, offlineRigs, 'name')
  }
}

module.exports = Notifications
