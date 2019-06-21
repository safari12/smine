const logger = require('./logger');
const db = require('./db');
const admin = require('./admin');
const server = require('./server');
const http = require('http').Server(server);
const socket = require('socket.io')(http);
const Mailer = require('./mailer');
const Rig = require('./rig').model;
const User = require('./user');
const config = require('./config');
const schedule = require('node-schedule');
const _ = require('lodash/fp');
const PORT = config.api.port;

module.exports = async () => {
  if ((await db.connect()) && (await admin.create())) {
    await http.listen(PORT);
    logger.info(`server is listening on port ${PORT}`);

    const mailer = new Mailer({
      service: 'gmail',
      auth: config.mailer.auth
    });

    let jobCompleted = true;

    schedule.scheduleJob('*/10 * * * * *', async () => {
      if (jobCompleted) {
        jobCompleted = false;
        mailer.recipients = await User.findRecipients();

        logger.info('syncing rigs from datacenter');

        const rigs = await Rig.findAll();
        let updatedRigs = await Rig.sync(rigs);
        updatedRigs = Rig.checkAlerts(rigs, updatedRigs);
        await Rig.saveMany(updatedRigs);

        socket.emit('rigs-synced', updatedRigs);

        logger.info('successfully synced rigs from datacenter');
        logger.info('checking alerts for rigs');

        const alerts = _.pipe(
          _.map('alerts'),
          _.flatten
        )(updatedRigs);

        if (alerts.length > 0) {
          logger.info('there are alerts for rigs, notifying users');
          await mailer.sendMail('SMine Alerts', _.map('message', alerts));
          jobCompleted = true;
          logger.info('successfully notified users');
        } else {
          jobCompleted = true;
          logger.info('no alerts for rigs');
        }
      }
    });
  }
};
