const _ = require('lodash')

const Rig = require('./rig')

class Farm {
  static async syncRigs() {
    const rigs = await Rig.find({})

    const promises = []

    _.each(rigs, r => {
      promises.push(r.ping())
      promises.push(r.syncMiners())
    })

    await Promise.all(promises)

    return rigs
  }
}

module.exports = Farm
