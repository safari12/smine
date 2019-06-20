const config = require('../config');

class MinerHandler {
  static getSupported(req, res) {
    const coin = req.params.coin;
    try {
      res.json(config.coins[coin].miners);
    } catch (error) {
      throw new Error(`no miners supported for coin ${coin}`);
    }
  }
}

module.exports = MinerHandler;
