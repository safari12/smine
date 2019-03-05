const mongoose = require('mongoose')

const DataSourceSchema = require('../datasource').schema
const Schema = mongoose.Schema

const ConfigSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  datasource: {
    type: DataSourceSchema,
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

module.exports = {
  model: mongoose.model('gpu_configs', ConfigSchema),
  schema: ConfigSchema
}
