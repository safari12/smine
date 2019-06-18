const mongoose = require('mongoose');

const config = require('../../config');

const Schema = mongoose.Schema;
const MinerConfigSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  miner: {
    type: String,
    required: true,
    enum: {
      values: Object.keys(config.miner.supported),
      message: 'miner not supported'
    }
  }
});

module.exports = {
  model: mongoose.model('miner_configs', MinerConfigSchema),
  schema: MinerConfigSchema
};
