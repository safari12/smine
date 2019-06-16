const _ = require('lodash');
const GPUConfig = require('./config');
const api = require('./api');

class GPUMethods {
  static async syncCards(hostname) {
    try {
      this.cards = await api.getCards(hostname);
      this.totalWattage = _.reduce(
        this.cards,
        (acc, c) => {
          return acc + c.wattage;
        },
        0
      );
    } catch (error) {
      this.cards = [];
      this.error = error.message;
    }
  }

  static async powerLimitCards(hostname) {
    if (this.cards.length > 0) {
      try {
        const gpuConfig = await GPUConfig.findOne(this.config);
        await api.powerLimitCards(hostname, gpuConfig.power.limit);
      } catch (error) {
        this.error = error.message;
      }
    }
  }
}

module.exports = GPUMethods;
