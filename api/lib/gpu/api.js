const got = require('got');
const config = require('../config');
const PORT = config.gpu.api.port;

class GPUApi {
  static async powerLimitCards(hostname, limit) {
    return got.post(`${this.getUrl(hostname)}/cards/power`, {
      json: true,
      body: { limit },
      timeout: 200,
      retry: 1
    });
  }

  static async getCards(hostname) {
    return got.get(`${this.getUrl(hostname)}/cards`, {
      json: true,
      timeout: 200,
      retry: 1
    });
  }

  static getUrl(hostname) {
    return `${hostname}:${PORT}/gpu`;
  }
}

module.exports = GPUApi;
