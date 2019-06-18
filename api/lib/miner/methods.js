const MinerConfig = require('./config').model;
const api = require('./api');

class MinerMethods {
  static async syncStats(miner, hostname) {
    try {
      const c = await MinerConfig.findById(miner.config);
      const status = await api.getStatus(c.miner, hostname);
      const parser = require(`./parsers/${c.miner}`);
      const hashrate = await parser.getHashrate(status);

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

module.exports = MinerMethods;
