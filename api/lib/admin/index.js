const bcrypt = require('bcrypt')

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

      const hash = await bcrypt.hash(
        config.admin.pass,
        config.bcrypt.salt.rounds
      )

      admin = new User({
        email: config.admin.email,
        pass: hash,
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
