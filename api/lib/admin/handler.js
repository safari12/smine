const bcrypt = require('bcrypt')

const config = require('../config')
const User = require('../user')

class AdminHandler {
  static async addUser(req, res) {
    const user = new User({
      email: req.body.email,
      pass: req.body.pass,
      admin: false
    })

    await user.validate()

    user.pass = await bcrypt.hash(user.pass, config.bcrypt.salt.rounds)

    await user.save()

    res.json({
      id: user._id,
      email: user.email,
      admin: user.admin
    })
  }
}

module.exports = AdminHandler
