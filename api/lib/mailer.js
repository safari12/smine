const nodemailer = require('nodemailer');
const _ = require('lodash/fp').convert({
  rearg: true
});

const html = require('./html');

/**
 * Class representing a program that sends email messages
 */
class Mailer {
  /**
   * constructor
   * @param {Object} options
   */
  constructor(options) {
    this.username = options.auth.user;
    this.recipients = options.recipients;
    this.transporter = nodemailer.createTransport(options);
  }

  /**
   * send email with subject and html content
   * @param {string} subject
   * @param {string} html
   */
  async sendMail(subject, messages) {
    const htmlList = html.generateList(messages);

    return Promise.all(
      _.map(recipient => {
        return this.transporter.sendMail({
          from: this.username,
          to: recipient,
          subject: subject,
          html: htmlList
        });
      })(this.recipients)
    );
  }
}

module.exports = Mailer;
