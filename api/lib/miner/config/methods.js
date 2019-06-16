const got = require('got');

class MinerConfigMethods {
  static callApi(hostname) {
    const uri = `${hostname}:${this.api.port}${this.api.endpoint}`;
    return got(uri, {
      json: true,
      retry: 3,
      timeout: 1000
    });
  }
}

module.exports = MinerConfigMethods;
