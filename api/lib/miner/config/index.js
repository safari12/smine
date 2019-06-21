const mongoose = require('mongoose');

const config = require('../../config');
const CoinSchema = require('../../coin').schema;

const Schema = mongoose.Schema;
const MinerConfigSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  coin: {
    type: CoinSchema,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: {
      values: Object.keys(config.miners),
      message: 'type not supported'
    }
  },
  device: {
    type: String,
    required: true
  }
});

module.exports = {
  model: mongoose.model('miner_configs', MinerConfigSchema),
  schema: MinerConfigSchema
};
