const mongoose = require('mongoose');
const actions = require('./actions');

const AlertSchema = new mongoose.Schema({
  message: {
    type: String
  }
});

AlertSchema.statics.check = actions.check;

module.exports = {
  schema: AlertSchema,
  model: mongoose.model('alerts', AlertSchema)
};
