const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const methods = require('./methods');
const GPUCardSchema = require('./card');

const GPUSchema = new Schema(
  {
    totalWattage: {
      type: Number,
      default: 0
    },
    cards: {
      type: [GPUCardSchema]
    },
    error: {
      type: String
    },
    config: {
      type: Schema.Types.ObjectId,
      ref: 'gpu_configs',
      required: true
    }
  },
  {
    _id: false
  }
);

GPUSchema.methods.syncCards = methods.syncCards;
GPUSchema.methods.powerLimitCards = methods.powerLimitCards;

module.exports = {
  schema: GPUSchema,
  model: mongoose.model('gpu', GPUSchema)
};
