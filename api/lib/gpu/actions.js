const _ = require('lodash/fp');
const got = require('got');
const GPUConfig = require('./config').model;
const api = require('./api');
const { GPUSyncCardsError, GPUPowerLimitCardsError } = require('./errors');

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
      if (error instanceof got.HTTPError) {
        throw new GPUSyncCardsError(error.response.body.error);
      } else {
        throw error;
      }
    }
  }

  static async powerLimitCards(gpu, hostname) {
    try {
      const c = await GPUConfig.findById(gpu.config);

      if (_.find(card => card.power.cap !== c.power.limit, gpu.cards)) {
        await api.powerLimitCards(hostname, c.power.limit);
      }

      return {
        ...gpu,
        error: null
      };
    } catch (error) {
      if (error instanceof got.HTTPError) {
        throw new GPUPowerLimitCardsError(error.response.body.error);
      } else {
        throw error;
      }
    }
  }
}

module.exports = GPUActions;
