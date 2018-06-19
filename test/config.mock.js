module.exports = {
  discovery: {
    number_of_rigs: 5,
    hostname: {
      prefix: 's-m-'
    },
    api: {
      port: 6969,
      endpoint: '/api.json'
    }
  },
  email: {
    host: 'smtp.gmail.com',
    port: 587,
    recipients: [
      'blah'
    ],
    auth: {
      user: 'blah',
      pass: 'blah'
    }
  }
}
