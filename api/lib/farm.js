const _ = require('lodash/fp');

const Rig = require('./rig').model;

const logger = require('./logger');

class Farm {
  constructor(socket) {
    this.socket = socket;
  }

  async syncRigs(rigs) {
    logger.info('syncing rigs data from mining farm');

    const updatedRigs = await Promise.all(
      _.pipe(
        _.map(r => [Rig.ping(r), Rig.syncMiners(r), Rig.syncGPUCards(r)]),
        _.flatten()
      )(rigs)
    );

    await Promise.all(_.map(r => r.save(), updatedRigs));

    logger.info('successfully synced rigs data from mining farm');

    this.socket.emit('rigs-synced', updatedRigs);

    return updatedRigs;
  }
}

module.exports = Farm;
