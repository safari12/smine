const mongoose = require('mongoose')
const config = require('../config')

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
  hashrate: Number,
  config: {
    type: Schema.Types.ObjectId,
    ref: 'miner_configs'
  }
})

module.exports = mongoose.model('miners', MinerSchema)
