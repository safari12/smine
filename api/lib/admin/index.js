const User = require('../user')
const config = require('../config')
const logger = require('../logger')

class Admin {
  static async create() {
    let admin = await User.findOne({
      admin: true,
      email: config.admin.email
    })

    if (!admin) {
      logger.info('admin does not exist, creating one')

      admin = new User({
        email: config.admin.email,
        pass: config.admin.pass,
        admin: true
      })

      await admin.save()
    } else {
      logger.info('admin already created')
    }
  }
}

module.exports = Admin