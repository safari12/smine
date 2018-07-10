const _ = require('lodash')

/**
 * Class representing a mining rig
 */
class Rig {
  constructor({name, miner, hashrate, data}) {
    this.name = name
    this.miner = miner
    this.hashrate = hashrate
    this.data = data
  }

  /**
   * gets id from rig number, for example 1 turns to 01
   * @param {number} number 
   */
  static getId(number) {
    if (number < 10) {
      return '0' + number.toString()
    } else {
      return number.toString()
    }
  }

  /**
   * returns total hashrate by summing up rigs' hashrate
   * @param {array} rigs 
   */
  static getTotalHashrate(rigs) {
    return _.sumBy(rigs, (r) => {
      return r.hashrate
    })
  }
}

module.exports = Rig
