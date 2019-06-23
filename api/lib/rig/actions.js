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
    let gpu = rig.gpu;

    try {
      gpu = await GPU.syncCards(gpu, rig.hostname);
      gpu = await GPU.powerLimitCards(gpu, rig.hostname);
    } catch (error) {
      gpu.error = error.message;
    }

    return {
      ...rig,
      gpu
    };
  }

  static checkAlerts(rigs, updatedRigs) {
    rigs = _.keyBy('_id', rigs);

    return _.map(r => ({ ...r, alerts: Alert.check(rigs[r._id], r) }))(
      updatedRigs
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
      _.map(async r => {
        try {
          r.isNew = false;
          r.gpu.config = undefined;
          return await r.save();
        } catch (error) {
          return null;
        }
      })
    )(rigs);
    return Promise.all(results);
  }
}

module.exports = RigActions;
