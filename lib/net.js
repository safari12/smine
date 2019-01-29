const util = require('util');
const exec = util.promisify(require('child_process').exec);

class Net {
  static async ping(hostname) {
    try {
      await exec(`ping -c 1 -W 5 ${hostname}`);
      return true;
    } catch (error) {
      return false;
    }
  }
}

module.exports = Net;
