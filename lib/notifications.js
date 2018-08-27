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
  }

  /**
   * notifies recipients through email if anything 
   * has changed in datacenter stats from last seen
   * @param {Object} stats 
   */
  notifyStatsIfNeeded(stats) {
    let content = ''

    if (stats.rigs.new.online.length > 0) {
      content += this.getEmailContentForRigs(
        stats.rigs.new.online,
        'The following rigs just became online'
      )
    }

    if (stats.rigs.new.offline.length > 0) {
      content += this.getEmailContentForRigs(
        stats.rigs.new.offline,
        'The following rigs just became offline'
      )
    }

    if (stats.rigs.fixed.length > 0) {
      content += this.getEmailContentForRigs(
        stats.rigs.fixed,
        'The following rigs are fixed and back online'
      )

      if (stats.rigs.currently.offline.length > 0) {
        content += this.getEmailContentForRigs(
          stats.rigs.currently.offline,
          'The following rigs are still offline'
        )
      }
    }

    if (content.length > 0) {
      const totalOnlineHashrate = Rig.getTotalHashrate(stats.rigs.currently.online)
      const totalOfflineHashrate = Rig.getTotalHashrate(stats.rigs.currently.offline)
    
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
    const rigNames = _.compact(_.map(rigs, _.property('name')))

    let content = ''

    if (rigNames.length > 0) {
      content += html.generateHeaderTag(3, headline)
      content += html.generateListTag(rigNames)
    }

    return content
  }
}

module.exports = Notifications
