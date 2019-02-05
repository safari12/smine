const mongoose = require('mongoose')

const config = require('../config')

const Schema = mongoose.Schema

module.exports = new Schema({
  name: {
    type: String,
    required: true,
    enum: {
      values: config.miner.supported,
      message: 'miner not supported'
    }
  },
  hashrate: {
    type: Number
  },
  api: new Schema({
    port: Number,
    endpoint: String
  })
})
