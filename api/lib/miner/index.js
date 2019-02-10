const mongoose = require('mongoose')
const _ = require('lodash')

const config = require('../config')
const logger = require('../logger')

const Schema = mongoose.Schema

const MinerSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    index: true,
    enum: {
      values: config.miner.supported,
      message: 'miner not supported'
    }
  },
  api: new Schema({
    port: Number,
    endpoint: String
  })
})

MinerSchema.statics.createSupported = function() {
  logger.info('saving supported miners to db')

  const Miner = this.model('miners')

  return Promise.all(
    _.map(config.miner.supported, async minerName => {
      if (!(await Miner.findOne({ name: minerName }))) {
        logger.info(`miner ${minerName} doesnt exist, saving`)
        const miner = new Miner({
          name: minerName,
          api: {
            port: null,
            endpoint: null
          }
        })

        await miner.save()
      } else {
        logger.info(`miner ${minerName} already exist`)
      }
    })
  )
}

module.exports = mongoose.model('miners', MinerSchema)
