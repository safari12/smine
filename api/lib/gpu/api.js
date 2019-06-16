const got = require('got');
const config = require('../config');
const PORT = config.gpu.api.port;
const TIMEOUT = config.gpu.api.timeout;
const RETRIES = config.gpu.api.retries;

class GPUApi {
  static async powerLimitCards(hostname, limit) {
    return got.post(`${this.getUrl(hostname)}/cards/power`, {
      json: true,
      body: { limit },
      timeout: TIMEOUT,
      retries: RETRIES
    });
  }

  static async getCards(hostname) {
    return got.get(`${this.getUrl(hostname)}/cards`, {
      json: true,
      timeout: TIMEOUT,
      retries: RETRIES
    });
  }

  static getUrl(hostname) {
    return `${hostname}:${PORT}/gpu`;
  }
}

module.exports = GPUApi;
