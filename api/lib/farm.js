const _ = require('lodash');

const logger = require('./logger');

class Farm {
  constructor(socket) {
    this.socket = socket;
  }

  async syncRigs(rigs) {
    logger.info('syncing rigs data from mining farm');

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

    this.socket.emit('rigs-synced', rigs);

    return rigs;
  }
}

module.exports = Farm;
