const mongoose = require('mongoose');

const methods = require('./methods');
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

RigSchema.methods.ping = methods.ping;
RigSchema.methods.syncMiners = methods.syncMiners;
RigSchema.methods.syncGPUCards = methods.syncGPUCards;

module.exports = mongoose.model('rigs', RigSchema);
