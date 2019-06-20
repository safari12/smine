const mongoose = require('mongoose');
const actions = require('./actions');

const MinerSchema = new mongoose.Schema(
  {
    hashrate: {
      type: Number,
      default: 0
    },
    error: {
      type: String
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

MinerSchema.statics.syncStats = actions.syncStats;

module.exports = {
  model: mongoose.model('miners', MinerSchema),
  schema: MinerSchema
};
