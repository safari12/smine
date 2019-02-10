/* eslint-disable quotes */
const Miner = require('.')

class MinerHandler {
  static async getSupported(req, res) {
    res.json(await Miner.find({}))
  }
  static async updateAPI(req, res) {
    const miner = await Miner.findOne({ name: req.body.name })

    if (miner) {
      miner.api = {
        port: req.body.port,
        endpoint: req.body.endpoint
      }
      await miner.save()
      res.json({
        message: "Successfully updated the miner's api settings"
      })
    } else {
      throw new Error('Miner not supported')
    }
  }
}

module.exports = MinerHandler
