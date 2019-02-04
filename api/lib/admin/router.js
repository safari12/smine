const express = require('express')
const bcrypt = require('bcrypt')

const token = require('../token')
const config = require('../config')
const User = require('../user')

const router = express.Router()

router.use([token.check, token.checkAdmin])

router.post('/users', async (req, res) => {
  try {
    const user = new User({
      email: req.body.email,
      pass: req.body.pass
    })

    await user.validate()

    user.pass = await bcrypt.hash(user.pass, config.bcrypt.salt.rounds)

    await user.save()

    res.json({
      success: true,
      message: 'Successfully added user'
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
})

module.exports = router