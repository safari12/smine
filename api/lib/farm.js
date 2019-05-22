const _ = require('lodash');

const logger = require('./logger');
const Rig = require('./rig');

class Farm {
  constructor(socket) {
    this.socket = socket;
  }

  async syncRigs() {
    logger.info('syncing rigs data from mining farm');

    const rigs = await Rig.find({})
      .populate('gpu.config')
      .populate('miners.config');

    const promises = [];

    _.each(rigs, r => {
      promises.push(r.ping());
      promises.push(r.syncMiners());
      promises.push(r.syncGPUCards());
    });

    await Promise.all(promises);
    await Promise.all(
      _.map(rigs, r => {
        return r.save();
      })
    );

    logger.info('successfully synced rigs data from mining farm');

    this.socket.emit('rigs-synced', _.keyBy(rigs, '_id'));

    return rigs;
  }
}

module.exports = Farm;
