const config = require('../config')

class MinerHandler {
  static getSupported(req, res) {
    res.json(config.miner.supported)
  }
}

module.exports = MinerHandler
