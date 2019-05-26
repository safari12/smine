const mongoose = require('mongoose');
const methods = require('./methods');

const MinerSchema = new mongoose.Schema(
  {
    hashrate: {
      type: Number,
      default: 0
    },
    config: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'miner_configs'
    }
  },
  {
    _id: false
  }
);

MinerSchema.methods.syncHashrate = methods.syncHashrate;

module.exports = {
  model: mongoose.model('miners', MinerSchema),
  schema: MinerSchema
};
