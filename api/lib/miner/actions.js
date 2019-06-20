const MinerConfig = require('./config').model;
const api = require('./api');

class MinerActions {
  static async syncStats(miner, hostname) {
    try {
      const minerConfig = await MinerConfig.findById(miner.config);
      const status = await api.getStatus(minerConfig.type, hostname);
      const parser = require(`./parsers/${minerConfig.type}`);
      const hashrate = parser.getHashrate(minerConfig, status);

      return {
        ...miner,
        hashrate,
        error: null
      };
    } catch (error) {
      return {
        ...miner,
        hashrate: 0,
        error: error.message
      };
    }
  }
}

module.exports = MinerActions;
