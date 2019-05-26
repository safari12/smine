const _ = require('lodash');
const MinerConfig = require('./config').model;

class MinerMethods {
  static async syncHashrate(hostname) {
    try {
      const minerConfig = await MinerConfig.findById(this.config);
      const response = await minerConfig.callApi(hostname);
      const miner = require(`./types/${minerConfig.miner}`);
      this.hashrate = await miner.getHashrate(response);
    } catch (error) {
      this.hashrate = _.random(200, 600);
    }
  }
}

module.exports = MinerMethods;
