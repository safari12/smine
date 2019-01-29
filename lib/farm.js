const _ = require('lodash');

const net = require('./net');

class Farm {
  static pingRigs(rigs) {
    return Promise.all(
      _.map(rigs, async rig => {
        rig.pingable = await net.ping(rig.name);
        return rig;
      })
    );
  }
}

module.exports = Farm;
