const mongoose = require('mongoose')

const MinerConfig = require('./config')
const config = require('../config')

const Schema = mongoose.Schema

const MinerSchema = new Schema({
  name: {
    type: String,
    enum: {
      values: config.miner.supported,
      message: 'miner not supported'
    }
  },
  hashrate: {
    type: Number,
    default: 0
  },
  config: {
    type: Schema.Types.ObjectId,
    ref: 'miner_configs'
  }
})

MinerSchema.pre('validate', async function() {
  const minerConfig = await MinerConfig.findById(this.config)
  if (minerConfig.miner != this.name) {
    throw new Error('config is not compatible with miner')
  }
})

module.exports = {
  model: mongoose.model('miners', MinerSchema),
  schema: MinerSchema
}
