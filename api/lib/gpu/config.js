const mongoose = require('mongoose')

const APISchema = require('../net/api')

const Schema = mongoose.Schema

const GPUConfigSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  api: {
    type: APISchema,
    required: true
  },
  card: {
    type: new Schema({
      count: {
        type: Number,
        required: true
      }
    }),
    required: true
  },
  power: {
    type: new Schema({
      limit: {
        type: Number,
        required: true
      }
    })
  }
})

module.exports = mongoose.model('gpu_configs', GPUConfigSchema)
