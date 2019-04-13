const mongoose = require('mongoose')
const got = require('got')

const MinerConfig = require('./config').model

const MinerSchema = new mongoose.Schema(
  {
    hashrate: {
      type: Number,
      default: 0
    },
    config: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'miner_configs'
    }
  },
  { _id: false }
)

MinerSchema.methods.syncHashrate = async function(hostname) {
  try {
    const minerConfig = await MinerConfig.findById(this.config)
    const uri = `http://${hostname}:${minerConfig.api.port}${
      minerConfig.api.endpoint
    }`
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
