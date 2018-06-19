const nodemailer = require('nodemailer')
const _ = require('lodash')

class Mailer {
  constructor(options) {
    this.username = options.auth.user
    this.recipients = options.recipients
    this.transporter = nodemailer.createTransport(options)
  }

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
