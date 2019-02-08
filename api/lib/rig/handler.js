const Rig = require('.')

class RigHandler {
  static async getAll(req, res) {
    res.json(await Rig.find({}))
  }

  static async add(req, res) {
    try {
      const rig = new Rig({
        name: req.body.name
      })

      await rig.save()

      res.json({
        success: true,
        message: 'Successfully added rig'
      })
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      })
    }
  }
}

module.exports = RigHandler
