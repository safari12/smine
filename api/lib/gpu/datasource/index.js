const mongoose = require('mongoose')

const config = require('../../config')
const APISchema = require('../../net/api').schema
const Schema = mongoose.Schema

const DataSourceSchema = new Schema(
  {
    type: {
      type: String,
      enum: {
        values: Object.keys(config.gpu.datasource.types),
        message: 'gpu datasource type not supported'
      },
      required: true
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
  schema: DataSourceSchema,
  model: mongoose.model('gpu_datasources', DataSourceSchema)
}
