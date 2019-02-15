const mongoose = require('mongoose')

const config = require('../config')
const APISchema = require('../net/api').schema

const Schema = mongoose.Schema

module.exports = mongoose.model(
  'miner_configs',
  new Schema({
    name: {
      type: String,
      required: true,
      unique: true
    },
    miner: {
      type: String,
      required: true,
      unique: true,
      index: true,
      enum: {
        values: config.miner.supported,
        message: 'miner not supported'
      }
    },
    api: {
      type: APISchema,
      required: true
    }
  })
)
