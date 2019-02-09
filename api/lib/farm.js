const _ = require('lodash')

const Rig = require('./rig')

class Farm {
  static async sync() {
    const rigs = await Rig.find({})

    await Promise.all(
      _.map(rigs, r => {
        return r.ping()
      })
    )

    console.log(rigs)
  }
}

module.exports = Farm
