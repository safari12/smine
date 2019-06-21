const got = require('got');
const config = require('../config');

class MinerApi {
  static getStatus(type, hostname) {
    const api = config.miners[type].api;
    return got.get(`${hostname}:${api.port}${api.endpoint}`, {
      json: true,
      retry: 3,
      timeout: 500
    });
  }
}

module.exports = MinerApi;
