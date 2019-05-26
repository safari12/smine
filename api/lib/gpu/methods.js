const _ = require('lodash');
const GPUConfig = require('./config');

class GPUMethods {
  static async syncCards(hostname) {
    try {
      const gpuConfig = await GPUConfig.findOne(this.config);
      this.cards = await gpuConfig.callApi(hostname);
      this.totalWattage = _.reduce(
        this.cards,
        (acc, c) => {
          return acc + c.wattage;
        },
        0
      );
    } catch (error) {
      this.cards = [];
    }
  }
}

module.exports = GPUMethods;
