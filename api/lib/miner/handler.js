const _ = require('lodash')
const config = require('../config')

class MinerHandler {
  static getSupported(req, res) {
    res.json(_.keys(config.miner.supported))
  }

  static getSupportedCoins(req, res) {
    const type = req.params.type
    if (config.miner.supported[type]) {
      res.json(config.miner.supported[type].coins)
    } else {
      res.json([])
    }
  }
}

module.exports = MinerHandler
