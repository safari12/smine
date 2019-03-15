const mongoose = require('mongoose')
const got = require('got')

const MinerConfig = require('./config').model
const config = require('../config')

const Schema = mongoose.Schema

const MinerSchema = new Schema(
  {
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
  },
  { _id: false }
)

MinerSchema.pre('validate', async function() {
  const minerConfig = await MinerConfig.findById(this.config)
  if (minerConfig.miner != this.name) {
    throw new Error('config is not compatible with miner')
  }
})

MinerSchema.methods.syncHashrate = async function(hostname) {
  try {
    const config = await MinerConfig.findById(this.config)
    const uri = `http://${hostname}:${config.api.port}${config.api.endpoint}`
    const response = await got(uri, { json: true })
    const miner = require(`./${this.name}`)
    this.hashrate = miner.getHashrate(response)
  } catch (error) {
    this.hashrate = 0
  }
}

module.exports = {
  model: mongoose.model('miners', MinerSchema),
  schema: MinerSchema
}
