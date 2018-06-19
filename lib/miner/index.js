const _ = require('lodash')

class Miner {
  constructor({name, software, data}) {
    this.name = name
    this.software = software
    this.data = data
  }

  static getId(number) {
    if (number < 10) {
      return '0' + number.toString()
    } else {
      return number.toString()
    }
  }

  static getTotalHashrate(miners) {
    return _.sumBy(miners, (m) => {
      return m.data.hashrate.highest
    })
  }
}

module.exports = Miner
