const net = require('../net');
const Rig = require('.').model;
const GPU = require('../gpu').model;
const Miner = require('../miner').model;
const Alert = require('../alert').model;
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

  static checkAlerts(rigs, updatedRigs) {
    updatedRigs = _.keyBy('_id', updatedRigs);

    return _.map(
      r =>
        new Rig({
          ...r.toObject(),
          alerts: Alert.check(r, updatedRigs[r._id])
        })
    )(rigs);
  }

  static sync(rigs) {
    return Promise.all(
      _.map(async r => {
        r = await Rig.ping(r);
        r = await Rig.syncGPUCards(r);
        return await Rig.syncMiners(r);
      })(rigs)
    );
  }

  static saveMany(rigs) {
    return Promise.all(_.map(r => r.save(), rigs));
  }
}

module.exports = RigActions;
