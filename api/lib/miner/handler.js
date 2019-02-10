/* eslint-disable quotes */
const Miner = require('.')
const MinerConfig = require('./config')

const config = require('../config')

class MinerHandler {
  static getSupported(req, res) {
    res.json(config.miner.supported)
  }
  static async getConfigs(req, res) {
    res.json(
      await MinerConfig.find({
        miner: req.params.miner
      })
    )
  }
  static async addConfig(req, res) {
    const minerName = req.params.miner
    const minerConfig = new MinerConfig({
      name: req.body.name,
      miner: minerName,
      api: req.body.api
    })

    await minerConfig.save()

    res.json({
      message: `Successfully added config for ${minerName} miner`
    })
  }
}

module.exports = MinerHandler
