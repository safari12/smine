const mongoose = require('mongoose')
const _ = require('lodash')

const config = require('../config')

const Schema = mongoose.Schema

const MinerSettingSchema = new Schema({
  name: {
    type: String,
    required: true,
    enum: {
      values: config.miner.supported,
      message: 'miner not supported'
    }
  },
  api: new Schema({
    port: Number,
    endpoint: String
  })
})

MinerSettingSchema.statics.create = function() {
  const MinerSetting = this.model('MinerSetting')

  _.each(config.miner.supported, async minerName => {
    if (!(await MinerSetting.findOne({ name: minerName }))) {
      const minerSetting = new MinerSetting({
        name: minerName
      })
      await minerSetting.save()
    }
  })
}

module.exports = mongoose.model('miner_settings')
