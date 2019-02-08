const express = require('express')

const Rig = require('.')
const token = require('../token')

const router = express.Router()

router
  .route('/')
  .get(token.check, async (req, res) => {
    res.json(await Rig.find({}))
  })
  .post([token.check, token.checkAdmin], async (req, res) => {
    try {
      const rig = new Rig({
        name: req.body.name
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
