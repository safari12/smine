const _ = require('lodash/fp');
const GPUConfig = require('./config').model;
const api = require('./api');

class GPUMethods {
  static async syncCards(gpu, hostname) {
    try {
      const cards = await api.getCards(hostname);
      const totalWattage = _.reduce((acc, c) => acc + c.wattage, cards);

      return {
        ...gpu,
        cards,
        totalWattage,
        error: null
      };
    } catch (error) {
      return {
        ...gpu,
        cards: [],
        totalWattage: 0,
        error: `error getting gpu cards: ${error.message}`
      };
    }
  }

  static async powerLimitCards(gpu, hostname) {
    try {
      const c = await GPUConfig.findById(gpu.config);
      await api.powerLimitCards(hostname, c.power.limit);
      return {
        ...gpu,
        error: null
      };
    } catch (error) {
      return {
        ...gpu,
        error: `error setting power limit for gpus: ${error.message}`
      };
    }
  }
}

module.exports = GPUMethods;
