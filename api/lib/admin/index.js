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

      try {
        await admin.save()
        return true
      } catch (error) {
        logger.error('error creating admin')
        logger.error(error)

        return false
      }
    } else {
      logger.info('admin already created')
      return true
    }
  }
}

module.exports = Admin