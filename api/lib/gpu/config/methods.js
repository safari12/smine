const got = require('got');
const config = require('../../config');

class GPUConfigMethods {
  static callApi(hostname) {
    const uri = `http://${hostname}:${config.gpu.api.port}${
      config.gpu.api.endpoint
    }`;
    return got(uri, {
      json: true,
      timeout: config.gpu.api.timeout,
      retry: config.gpu.api.retries
    });
  }
}

module.exports = GPUConfigMethods;
