const mongoose = require('mongoose')

const config = require('../config')

const APISchema = require('../net/api')
const Schema = mongoose.Schema

const GPUDataSourceSchema = new Schema({
  type: {
    type: String,
    required: true,
    enum: {
      values: Object.keys(config.gpu.datasource.types),
      message: 'datasource type not supported'
    }
  },
  api: {
    type: APISchema,
    required: true
  }
})

module.exports = {
  schema: GPUDataSourceSchema
}
