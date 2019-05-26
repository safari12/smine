const net = require('../net');
const _ = require('lodash');

class RigActions {
  static async ping() {
    this.pingable = await net.ping(this.hostname);
  }

  static async syncMiners() {
    await Promise.all(
      _.map(this.miners, m => {
        return m.syncHashrate(this.hostname);
      })
    );
    this.hashrate = _.reduce(
      this.miners,
      (h, m) => {
        return h + m.hashrate;
      },
      0
    );
  }

  static syncGPUCards() {
    return this.gpu.syncCards(this.hostname);
  }
}

module.exports = RigActions;
