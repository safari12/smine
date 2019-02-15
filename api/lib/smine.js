const logger = require('./logger')
const db = require('./db')
const admin = require('./admin')
const server = require('./server')
const farm = require('./farm')
const config = require('./config')

module.exports = async () => {
  if ((await db.connect()) && (await admin.create())) {
    const PORT = config.api.port
    await server.listen(PORT)
    logger.info(`server is listening on port ${PORT}`)
    await farm.syncRigs()
  }
}
