const _ = require('lodash/fp');
const config = require('../config');

class CoinHandler {
  static getSupported(req, res) {
    res.json(_.keys(config.coins));
  }
}

module.exports = CoinHandler;
