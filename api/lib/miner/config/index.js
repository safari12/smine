const mongoose = require('mongoose');

const config = require('../../config');

const Schema = mongoose.Schema;
const MinerConfigSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  coin: {
    type: String,
    required: true,
    enum: {
      values: Object.keys(config.coins),
      message: 'coin not supported'
    }
  },
  type: {
    type: String,
    required: true,
    enum: {
      values: Object.keys(config.miners),
      message: 'type not supported'
    }
  }
});

module.exports = {
  model: mongoose.model('miner_configs', MinerConfigSchema),
  schema: MinerConfigSchema
};
