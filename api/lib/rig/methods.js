const net = require('../net');
const GPU = require('../gpu').model;
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

  static async syncGPUCards(rig) {
    await GPU.syncCards(rig.gpu, rig.hostname);
    await GPU.powerLimitCards(rig.gpu, rig.hostname);
  }
}

module.exports = RigActions;
