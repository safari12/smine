const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GPUConfigSchema = Schema({
  name: {
    type: String,
    required: true
  },
  power: {
    type: new Schema(
      {
        limit: {
          type: Number,
          required: true
        }
      },
      {
        _id: false
      }
    )
  }
});

module.exports = {
  model: mongoose.model('gpu_configs', GPUConfigSchema),
  schema: GPUConfigSchema
};
