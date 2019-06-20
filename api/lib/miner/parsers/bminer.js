const _ = require('lodash/fp');
const config = require('../../config');

class BMiner {
  static getHashrate(minerConfig, response) {
    return _.pipe(
      _.get('devices'),
      _.values,
      _.map('solvers'),
      _.flatten,
      _.filter([
        'algorithm',
        config.miners[minerConfig.type].algorithms[minerConfig.coin]
      ]),
      _.reduce((acc, d) => acc + d.speed_info.hash_rate, 0)
    )(response);
  }
}

module.exports = BMiner;
