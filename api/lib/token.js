const jwt = require('jsonwebtoken')

const config = require('./config')

class Token {
  static async create(user) {
    return await jwt.sign(
      {
        id: user.id,
        admin: user.admin
      },
      config.api.secret
    )
  }

  static async check(req, res, next) {
    const token = Token.getToken(req)

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      })
    }

    try {
      await jwt.verify(token, config.api.secret)
      next()
    } catch (error) {
      res.status(401).json({
        success: false,
        message: 'Failed to authenticate token'
      })
    }
  }

  static async checkAdmin(req, res, next) {
    const token = Token.getToken(req)
    const user = await jwt.decode(token)

    if (!user.admin) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorize access'
      })
    }

    next()
  }

  static getToken(req) {
    return req.query.token || req.body.token || req.headers['x-access-token']
  }
}

module.exports = Token
