const bcrypt = require('bcrypt')

const User = require('.')
const token = require('../token')

class UserHandler {
  static async login(req, res) {
    const user = await User.findOne({
      email: req.body.email
    })

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      })
    }

    if (!(await bcrypt.compare(req.body.pass, user.pass))) {
      return res.status(401).json({
        success: false,
        message: 'Wrong Password'
      })
    }

    const adminToken = await token.create({
      id: user._id,
      admin: user.admin
    })

    res.json({
      id: user._id,
      email: user.email,
      admin: user.admin,
      token: adminToken
    })
  }
}

module.exports = UserHandler