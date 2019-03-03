const config = require('../config')
const GPUConfig = require('./config')

class GPUHandler {
  static async addConfig(req, res) {
    const config = new GPUConfig({
      name: req.body.name,
      datasource: req.body.datasource,
      card: req.body.card,
      power: req.body.power
    })

    await config.save()

    res.json({
      message: 'Successfully added config for gpus'
    })
  }
  static async getConfigs(req, res) {
    res.json(await GPUConfig.find({}))
  }
  static getDataSourceTypes(req, res) {
    res.json(config.gpu.datasource.types)
  }
}

module.exports = GPUHandler
