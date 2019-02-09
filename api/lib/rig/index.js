const mongoose = require('mongoose')

const MinerSchema = require('../miner')
const net = require('../net')

const Schema = mongoose.Schema

const RigSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  pingable: {
    type: Boolean,
    default: false
  },
  miner: {
    type: MinerSchema
  }
})

RigSchema.methods.ping = async function() {
  this.pingable = await net.ping(this.name)
}

module.exports = mongoose.model('rigs', RigSchema)
