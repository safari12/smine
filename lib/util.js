const _ = require('lodash')

class Util {
  /**
   * converts hashrate to a human readable formatted text
   * @param {number} hashrate 
   */
  getHumanReadableHashrate(hashrate) {
    const roundedHashrate = _.floor(hashrate)

    if (roundedHashrate >= 1000000) {
      return (roundedHashrate / 1000000) + ' MH/s'
    }
    else if (roundedHashrate >= 1000) {
      return (roundedHashrate / 1000) + ' KH/s'
    }

    return roundedHashrate + ' H/s'
  }
}

module.exports = new Util()
