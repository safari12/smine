const express = require('express')

const Rig = require('.')
const token = require('../token')

const router = express.Router()

router.use([token.check, token.checkAdmin])

router.route('/').post(async (req, res) => {
  try {
    const rig = new Rig({
      name: req.body.name,
      miner: req.body.miner
    })

    await rig.save()

    res.json({
      success: true,
      message: 'Successfully added rig'
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
})

module.exports = router
