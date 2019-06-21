const mongoose = require('mongoose');

const actions = require('./actions');
const MinerSchema = require('../miner').schema;
const GPUSchema = require('../gpu').schema;
const AlertSchema = require('../alert').schema;

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
  },
  alerts: {
    type: [AlertSchema]
  }
});

RigSchema.statics.ping = actions.ping;
RigSchema.statics.syncMiners = actions.syncMiners;
RigSchema.statics.syncGPUCards = actions.syncGPUCards;
RigSchema.statics.checkAlerts = actions.checkAlerts;
RigSchema.statics.sync = actions.sync;
RigSchema.statics.saveMany = actions.saveMany;
RigSchema.statics.findAll = actions.findAll;

module.exports = {
  schema: RigSchema,
  model: mongoose.model('rigs', RigSchema)
};
