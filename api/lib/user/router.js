const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('.')
const config = require('../config')

const router = express.Router()

router.post('/login', async (req, res) => {
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

  const token = await jwt.sign({
    id: user._id,
    admin: user.admin
  }, config.api.secret)

  res.json({
    success: true,
    token: token
  })
})

module.exports = router