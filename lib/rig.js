const _ = require('lodash')

class Rig {
  constructor({name, miner, hashrate, data}) {
    this.name = name
    this.miner = miner
    this.hashrate = hashrate
    this.data = data
  }

  static getId(number) {
    if (number < 10) {
      return '0' + number.toString()
    } else {
      return number.toString()
    }
  }

  static getTotalHashrate(rigs) {
    return _.sumBy(rigs, (r) => {
      return r.hashrate
    })
  }
}

module.exports = Rig
