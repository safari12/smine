const _ = require('lodash')

class Util {
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
