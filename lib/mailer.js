const nodemailer = require('nodemailer')
const _ = require('lodash')

/**
 * Class representing a program that sends email messages
 */
class Mailer {
  /**
   * constructor
   * @param {Object} options 
   */
  constructor(options) {
    this.username = options.auth.user
    this.recipients = options.recipients
    this.transporter = nodemailer.createTransport(options)
  }

  /**
   * send email with subject and html content
   * @param {string} subject 
   * @param {string} html 
   */
  async sendMail(subject, html) {
    const promises = []

    _.each(this.recipients, (recipient) => {
      const options = {
        from: this.username,
        to: recipient,
        subject: subject,
        html: html
      }

      promises.push(this.transporter.sendMail(options))
    })

    return promises
  }
}

module.exports = Mailer
