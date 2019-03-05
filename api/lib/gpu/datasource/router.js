const express = require('express')
const config = require('../../config')

const router = express.Router()
router.get('/types', (req, res) => {
  res.json(Object.keys(config.gpu.datasource.types))
})

module.exports = router
