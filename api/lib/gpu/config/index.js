const mongoose = require('mongoose');
const methods = require('./methods');
const Schema = mongoose.Schema;

const GPUConfigSchema = Schema({
  name: {
    type: String,
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
      {
        _id: false
      }
    )
  }
});

GPUConfigSchema.methods.callApi = methods.callApi;

module.exports = {
  model: mongoose.model('gpu_configs', GPUConfigSchema),
  schema: GPUConfigSchema
};
