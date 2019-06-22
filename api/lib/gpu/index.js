const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const actions = require('./actions');
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
    _id: false,
    minimize: false
  }
);

GPUSchema.statics.syncCards = actions.syncCards;
GPUSchema.statics.powerLimitCards = actions.powerLimitCards;

module.exports = {
  schema: GPUSchema,
  model: mongoose.model('gpu', GPUSchema)
};
