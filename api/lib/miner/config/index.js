const mongoose = require('mongoose');

const config = require('../../config');
const methods = require('./methods');
const APISchema = require('../../net/api').schema;

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
  },
  api: {
    type: APISchema,
    required: true
  }
});

MinerConfigSchema.methods.callApi = methods.callApi;

module.exports = {
  model: mongoose.model('miner_configs', MinerConfigSchema),
  schema: MinerConfigSchema
};
