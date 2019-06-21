const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RangeSchema = new Schema(
  {
    usage: {
      type: Number
    },
    cap: {
      type: Number
    }
  },
  {
    _id: false
  }
);

const GPUCardSchema = new Schema(
  {
    name: {
      type: String
    },
    device: {
      type: Number
    },
    power: {
      type: RangeSchema,
      required: true
    },
    memory: {
      type: RangeSchema,
      required: true
    },
    fanSpeed: {
      type: Number,
      default: 0
    },
    volatile: {
      type: Number,
      default: 0
    }
  },
  {
    _id: false
  }
);

module.exports = GPUCardSchema;
