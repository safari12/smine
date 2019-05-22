const _ = require('lodash');

class BMiner {
  static async getHashrate(response) {
    return _.random(50);
  }
}

module.exports = BMiner;
