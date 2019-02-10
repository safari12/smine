const Rig = require('.')

class RigHandler {
  static async getAll(req, res) {
    res.json(await Rig.find({}))
  }

  static async add(req, res) {
    const rig = new Rig({
      hostname: req.body.hostname
    })

    await rig.save()

    res.json({
      message: 'Successfully added rig'
    })
  }
}

module.exports = RigHandler
