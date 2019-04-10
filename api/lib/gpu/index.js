const mongoose = require('mongoose')
const got = require('got')
const config = require('../config')
const Schema = mongoose.Schema

const GPUSchema = new Schema({
  cards: [Object],
  config: {
    type: Schema.Types.ObjectId,
    ref: 'gpu_configs',
    required: true
  }
}, {
  _id: false
})

GPUSchema.methods.syncCards = async function (hostname) {
  try {
    const uri = `http://${hostname}:${config.gpu.api.port}${config.gpu.api.endpoint}`
    const {
      body
    } = await got(uri, {
      json: true,
      timeout: config.gpu.api.timeout,
      retry: config.gpu.api.retries
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