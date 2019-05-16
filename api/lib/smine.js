const logger = require('./logger');
const db = require('./db');
const admin = require('./admin');
const server = require('./server');
const http = require('http').Server(server);
const socket = require('socket.io')(http);
const Farm = require('./farm');
const config = require('./config');
const schedule = require('node-schedule');

module.exports = async () => {
  if ((await db.connect()) && (await admin.create())) {
    const PORT = config.api.port;
    await http.listen(PORT);
    logger.info(`server is listening on port ${PORT}`);
    const farm = new Farm(socket);
    schedule.scheduleJob('*/10 * * * * *', async () => {
      await farm.syncRigs();
    });
  }
};
