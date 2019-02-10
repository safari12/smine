const Rig = require('.')

class RigHandler {
  static async getAll(req, res) {
    res.json(await Rig.find({}))
  }

  static async add(req, res) {
    const rig = new Rig({
      hostname: req.body.hostname,
      miners: req.body.miners
    })

    await rig.save()

    res.json({
      message: 'Successfully added rig'
    })
  }

  static async remove(req, res) {
    const hostname = req.params.hostname

    await Rig.findOneAndDelete({
      hostname: req.params.hostname
    })

    res.json({
      message: `Successfully removed rig ${hostname}`
    })
  }
}

module.exports = RigHandler
