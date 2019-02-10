const mongoose = require('mongoose')
const _ = require('lodash')

const net = require('../net')
const config = require('../config')

const Schema = mongoose.Schema

const RigSchema = new Schema({
  hostname: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  pingable: {
    type: Boolean,
    default: false
  },
  miners: {
    type: Array
  }
})

RigSchema.methods.ping = async function() {
  this.pingable = await net.ping(this.hostname)
}

RigSchema.methods.syncMiners = async function() {
  this.miners = []

  await Promise.all(
    _.map(config.miner.supported, async minerName => {
      const miner = require(`../miner/${minerName}`)
      const hashrate = await miner.getHashrate()

      if (hashrate > 0) {
        this.miners.push({
          name: minerName,
          hashrate: hashrate
        })
      }
    })
  )
}

module.exports = mongoose.model('rigs', RigSchema)
