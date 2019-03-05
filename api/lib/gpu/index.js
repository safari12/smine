const mongoose = require('mongoose')
const got = require('got')

const Config = require('./config')
const Schema = mongoose.Schema
const GPUSchema = new Schema(
  {
    cards: [Object],
    config: {
      type: Schema.Types.ObjectId,
      ref: 'gpu_configs',
      required: true
    }
  },
  { _id: false }
)

GPUSchema.methods.syncCards = async function(hostname) {
  try {
    const config = await Config.findById(this.config)
    const uri = `http://${hostname}:${config.api.port}${config.api.endpoint}`
    const { body } = await got(uri, {
      json: true,
      timeout: config.api.timeout,
      retry: config.api.retry
    })

    this.cards = body
  } catch (error) {
    this.cards = []
  }
}

module.exports = {
  schema: GPUSchema,
  model: mongoose.model('gpu', GPUSchema)
}
