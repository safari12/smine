const mongoose = require('mongoose')
const _ = require('lodash')

const net = require('../net')
const MinerSchema = require('../miner').schema
const GPUSchema = require('../gpu').schema

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
    type: [MinerSchema],
    required: true
  },
  gpu: {
    type: GPUSchema,
    required: true
  }
})

RigSchema.methods.ping = async function() {
  this.pingable = await net.ping(this.hostname)
}

RigSchema.methods.syncMiners = function() {
  return Promise.all(
    _.map(this.miners, m => {
      return m.syncHashrate(this.hostname)
    })
  )
}

RigSchema.methods.syncGPUCards = function() {
  return this.gpu.syncCards(this.hostname)
}

module.exports = mongoose.model('rigs', RigSchema)
