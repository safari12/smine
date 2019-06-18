const logger = require('./logger');
const db = require('./db');
const admin = require('./admin');
const server = require('./server');
const http = require('http').Server(server);
const socket = require('socket.io')(http);
const Farm = require('./farm');
const Mailer = require('./mailer');
const Rig = require('./rig').model;
const User = require('./user');
const Alerts = require('./alerts');
const config = require('./config');
const schedule = require('node-schedule');
const _ = require('lodash');
const PORT = config.api.port;

module.exports = async () => {
  if ((await db.connect()) && (await admin.create())) {
    await http.listen(PORT);
    logger.info(`server is listening on port ${PORT}`);

    const farm = new Farm(socket);
    const mailer = new Mailer({
      auth: config.mailer.auth
    });
    const alerts = new Alerts(require('./alerts/conditions'));

    schedule.scheduleJob('*/30 * * * * *', async () => {
      mailer.recipients = await User.findRecipients();

      const rigs = await Rig.findWithPopulated();
      const updatedRigs = await farm.syncRigs(rigs);

      const conditions = alerts.getTriggeredConditions(rigs, updatedRigs);
      if (conditions.length > 0) {
        await mailer.sendMail('SMine Alerts', _.map(conditions, 'message'));
      }
    });
  }
};
