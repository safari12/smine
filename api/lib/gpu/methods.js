const _ = require('lodash');
const GPUConfig = require('./config');
const api = require('./api');

class GPUMethods {
  static async syncCards(hostname) {
    try {
      this.cards = await api.getCards(hostname);
      this.error = null;
      this.totalWattage = _.reduce(
        this.cards,
        (acc, c) => {
          return acc + c.wattage;
        },
        0
      );
    } catch (error) {
      this.cards = [];
      this.error = `error getting gpu cards: ${error.message}`;
    }
  }

  static async powerLimitCards(hostname) {
    if (this.cards.length > 0) {
      try {
        const gpuConfig = await GPUConfig.findOne(this.config);
        await api.powerLimitCards(hostname, gpuConfig.power.limit);
        this.error = null;
      } catch (error) {
        this.error = `error setting power limit for gpus: ${error.message}`;
      }
    }
  }
}

module.exports = GPUMethods;
