const mongoose = require('mongoose')

const GPUDataSourceSchema = require('./datasource')
const Schema = mongoose.Schema

const GPUConfigSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  datasource: {
    type: GPUDataSourceSchema,
    required: true
  },
  card: {
    type: new Schema(
      {
        count: {
          type: Number,
          required: true
        }
      },
      { _id: false }
    ),
    required: true
  },
  power: {
    type: new Schema(
      {
        limit: {
          type: Number,
          required: true
        }
      },
      { _id: false }
    )
  }
})

module.exports = mongoose.model('gpu_configs', GPUConfigSchema)
