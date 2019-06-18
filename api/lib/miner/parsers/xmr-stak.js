const _ = require('lodash');

class XMRStak {
  static async getHashrate(response) {
    return _.random(50);
  }
}

module.exports = XMRStak;
