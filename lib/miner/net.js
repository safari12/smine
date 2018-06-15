const Miner = require('./model')

class MinerNet {
  constructor(config) {
    this.config = config
    this.stats = {
      offline: [],
      online: []
    }
  }

  syncStats() {
    this.stats = {
      offline: [],
      online: [
        new Miner({
          name: 's-m-01',
          software: 'xmr-stak',
          data: {}
        })
      ]
    }

    return this.stats
  }

  getStats() {
    return this.stats
  }
}

module.exports = MinerNet