const _ = require('lodash')

const logger = require('./logger')
const Rig = require('./rig')

class Farm {
  static async syncRigs() {
    logger.info('syncing rigs data from mining farm')

    const rigs = await Rig.find({})

    const promises = []

    _.each(rigs, r => {
      promises.push(r.ping())
      promises.push(r.syncMiners())
    })

    await Promise.all(promises)
    await Promise.all(
      _.map(rigs, r => {
        return r.save()
      })
    )

    logger.info('successfully synced rigs data from mining farm')

    return rigs
  }
}

module.exports = Farm
