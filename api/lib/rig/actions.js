const net = require('../net');
const Rig = require('.').model;
const GPU = require('../gpu').model;
const Miner = require('../miner').model;
const _ = require('lodash/fp');

class RigActions {
  static async ping(rig) {
    return new Rig({
      ...rig.toObject(),
      pingable: await net.ping(this.hostname)
    });
  }

  static async syncMiners(rig) {
    const miners = await Promise.all(
      _.map(m => Miner.syncStats(m, rig.hostname))
    );

    return new Rig({
      ...rig.toObject(),
      miners,
      hashrate: _.reduce((h, m) => h + m.hostname, 0, miners)
    });
  }

  static async syncGPUCards(rig) {
    // TODO: compose promises
    let gpu = await GPU.syncCards(rig.gpu, rig.hostname);
    gpu = await GPU.powerLimitCards(gpu, rig.hostname);

    return new Rig({
      ...rig.toObject(),
      gpu
    });
  }
}

module.exports = RigActions;
