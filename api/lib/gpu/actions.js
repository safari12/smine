const _ = require('lodash/fp');
const GPUConfig = require('./config').model;
const api = require('./api');
const {
  GPUApiError,
  GPUSyncCardsError,
  GPUPowerLimitCardsError
} = require('./errors');

class GPUActions {
  static async syncCards(gpu, hostname) {
    try {
      const { body } = await api.getCards(hostname);
      const cards = body;
      const totalWattage = _.reduce((acc, c) => acc + c.power.usage, 0, cards);

      return {
        ...gpu,
        cards,
        totalWattage,
        error: null
      };
    } catch (error) {
      if (!(error instanceof GPUApiError) && error.body) {
        throw new GPUSyncCardsError(error.body.error);
      } else {
        throw error;
      }
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
      if (!(error instanceof GPUApiError) && error.body) {
        throw new GPUPowerLimitCardsError(error.body.error);
      } else {
        throw error;
      }
    }
  }
}

module.exports = GPUActions;
