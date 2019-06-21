const _ = require('lodash/fp');
const config = require('../config');

const Coin = require('.').model;

class CoinHandler {
  static getSupported(req, res) {
    const coins = _.pipe(
      _.keys,
      _.map(k => new Coin({ name: k }))
    )(config.coins);
    res.json(coins);
  }
}

module.exports = CoinHandler;
