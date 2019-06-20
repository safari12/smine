const _ = require('lodash/fp');
const config = require('../config');

class CoinHandler {
  static getSupported(req, res) {
    const coins = _.pipe(
      _.keys,
      _.map(k => ({ name: k }))
    )(config.coins);
    res.json(coins);
  }
}

module.exports = CoinHandler;
