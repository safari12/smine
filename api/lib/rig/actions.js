const net = require('../net');
const GPU = require('../gpu').model;
const Miner = require('../miner').model;
const Alert = require('../alert').model;
const _ = require('lodash/fp');
const logger = require('../logger');

class RigActions {
  static async ping(rig) {
    logger.info(`pinging rig ${rig.hostname}`);
    return {
      ...rig,
      pingable: await net.ping(rig.hostname)
    };
  }

  static async syncMiners(rig) {
    logger.info(`syncing miner stats for ${rig.hostname}`);
    const miners = await Promise.all(
      _.map(m => Miner.syncStats(m, rig.hostname))(rig.miners)
    );

    return {
      ...rig,
      miners,
      hashrate: _.reduce((h, m) => h + m.hashrate, 0, miners)
    };
  }

  static async syncGPUCards(rig) {
    logger.info(`syncing gpu card stats for ${rig.hostname}`);
    // TODO: compose promises
    let gpu = await GPU.syncCards(rig.gpu, rig.hostname);
    gpu = await GPU.powerLimitCards(gpu, rig.hostname);

    return {
      ...rig,
      gpu
    };
  }

  static checkAlerts(rigs, updatedRigs) {
    updatedRigs = _.keyBy('_id', updatedRigs);

    return _.map(r => ({ ...r, alerts: Alert.check(r, updatedRigs[r._id]) }))(
      rigs
    );
  }

  static sync(rigs) {
    const Rig = this;
    return Promise.all(
      _.map(async r => {
        r = await Rig.ping(r);
        r = await Rig.syncGPUCards(r);
        return await Rig.syncMiners(r);
      })(rigs)
    );
  }

  static async findAll() {
    let rigs = await this.find({})
      .populate('gpu.config')
      .populate('miners.config');

    return _.map(r => r.toObject())(rigs);
  }

  static saveMany(rigs) {
    const Rig = this;
    const results = _.pipe(
      _.map(r => new Rig(r)),
      _.map(r => {
        r.isNew = false;
        return r.save();
      })
    )(rigs);
    return Promise.all(results);
  }
}

module.exports = RigActions;
