const mongoose = require('mongoose');

const actions = require('./actions');
const MinerSchema = require('../miner').schema;
const GPUSchema = require('../gpu').schema;

const RigSchema = new mongoose.Schema({
  hostname: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  pingable: {
    type: Boolean,
    default: false
  },
  hashrate: {
    type: Number,
    default: 0
  },
  miners: {
    type: [MinerSchema],
    required: true
  },
  gpu: {
    type: GPUSchema,
    required: true
  }
});

RigSchema.statics.ping = actions.ping;
RigSchema.statics.syncMiners = actions.syncMiners;
RigSchema.statics.syncGPUCards = actions.syncGPUCards;
RigSchema.statics.findWithPopulated = function() {
  return this.find({})
    .populate('gpu.config')
    .populate('miners.config');
};

module.exports = {
  schema: RigSchema,
  model: mongoose.model('rigs', RigSchema)
};
