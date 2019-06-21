const mongoose = require('mongoose');
const config = require('../config');

const Schema = mongoose.Schema;

const CoinSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      enum: {
        values: Object.keys(config.coins),
        message: 'coin not supported'
      }
    }
  },
  {
    _id: false
  }
);

module.exports = {
  model: mongoose.model('coins', CoinSchema),
  schema: CoinSchema
};
