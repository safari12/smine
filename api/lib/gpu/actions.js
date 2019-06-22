const _ = require('lodash/fp');
const GPUConfig = require('./config').model;
const api = require('./api');

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
        error: {}
      };
    } catch (error) {
      let gpuError = {};

      if (error.code === 'ENOTFOUND') {
        gpuError.api = 'nvidia gpu api not running';
      } else if (error.code === 'ECONNREFUSED') {
        gpuError.api = 'could not connect to nvidia gpu api';
      } else {
        gpuError.cards = `error getting gpu cards: ${error.body.error}`;
      }

      return {
        ...gpu,
        cards: [],
        totalWattage: 0,
        error: gpuError
      };
    }
  }

  static async powerLimitCards(gpu, hostname) {
    try {
      const c = await GPUConfig.findById(gpu.config);
      await api.powerLimitCards(hostname, c.power.limit);
      return {
        ...gpu,
        error: {}
      };
    } catch (error) {
      let gpuError = {};

      if (error.code === 'ENOTFOUND') {
        gpuError.api = 'nvidia gpu api not running';
      } else if (error.code === 'ECONNREFUSED') {
        gpuError.api = 'could not connect to nvidia gpu api';
      } else {
        gpuError.cards = `error setting power limit for gpus: ${
          error.body.error
        }`;
      }

      return {
        ...gpu,
        error: gpuError
      };
    }
  }
}

module.exports = GPUActions;