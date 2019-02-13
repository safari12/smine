const Rig = require('.')

class RigHandler {
  static async getAll(req, res) {
    res.json(await Rig.find({}))
  }

  static async add(req, res) {
    const rig = new Rig({
      hostname: req.body.hostname,
      miners: req.body.miners,
      gpu: req.body.gpu
    })

    await rig.save()

    res.json({
      message: 'Successfully added rig'
    })
  }

  static async remove(req, res) {
    await Rig.findOneAndDelete({
      _id: req.params.id
    })

    res.json({
      message: 'Successfully removed rig'
    })
  }
}

module.exports = RigHandler
