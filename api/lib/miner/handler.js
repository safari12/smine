const _ = require('lodash/fp');
const config = require('../config');

class MinerHandler {
  static getSupported(req, res) {
    const coin = req.params.coin;
    try {
      const miners = _.pipe(
        _.get(coin),
        _.get('miners'),
        _.map(k => ({ name: k }))
      )(config.coins);
      res.json(miners);
    } catch (error) {
      throw new Error(`no miners supported for coin ${coin}`);
    }
  }
}

module.exports = MinerHandler;
