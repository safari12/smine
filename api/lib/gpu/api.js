const got = require('got');
const config = require('../config');
const { GPUApiNotRunningError, GPUApiRefusedError } = require('./errors');
const PORT = config.gpu.api.port;

class GPUApi {
  static async powerLimitCards(hostname, limit) {
    try {
      return await got.post(`${this.getUrl(hostname)}/cards/power`, {
        json: true,
        body: { limit },
        timeout: 2000,
        retry: 1
      });
    } catch (error) {
      this.throwError(error);
    }
  }

  static async getCards(hostname) {
    try {
      return await got(`${this.getUrl(hostname)}/cards`, {
        json: true,
        timeout: 2000,
        retry: 1
      });
    } catch (error) {
      this.throwError(error);
    }
  }

  static getUrl(hostname) {
    return `http://${hostname}:${PORT}/gpu`;
  }

  static throwError(error) {
    if (error.code === 'ENOTFOUND') {
      throw new GPUApiNotRunningError();
    } else if (error.code === 'ECONNREFUSED') {
      throw new GPUApiRefusedError();
    } else {
      throw error;
    }
  }
}

module.exports = GPUApi;
