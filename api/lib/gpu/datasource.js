const mongoose = require('mongoose')

const config = require('../config')

const APISchema = require('../net/api').schema
const Schema = mongoose.Schema

const GPUDataSourceSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      index: true,
      unique: true,
      enum: {
        values: Object.keys(config.gpu.datasource.types),
        message: 'datasource type not supported'
      }
    },
    api: {
      type: APISchema,
      required: true
    }
  },
  {
    _id: false
  }
)

module.exports = {
  schema: GPUDataSourceSchema
}
