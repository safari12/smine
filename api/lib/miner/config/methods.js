const got = require('got');

class MinerConfigMethods {
  static callApi(hostname) {
    const uri = `http://${hostname}:${this.api.port}${this.api.endpoint}`;
    return got(uri, {
      json: true
    });
  }
}

module.exports = MinerConfigMethods;
