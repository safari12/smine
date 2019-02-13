const GPUConfig = require('./config')

class GPUHandler {
  static async addConfig(req, res) {
    const config = new GPUConfig({
      name: req.body.name,
      api: req.body.api,
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
}

module.exports = GPUHandler
