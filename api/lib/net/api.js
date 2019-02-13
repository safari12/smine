const mongoose = require('mongoose')

const Schema = mongoose.Schema

module.exports = {
  schema: new Schema({
    endpoint: {
      type: String,
      default: ''
    },
    port: {
      type: Number,
      required: true
    }
  })
}