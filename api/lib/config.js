module.exports = {
  db: {
    username: process.env.SM_DB_USERNAME,
    password: process.env.SM_DB_PASSWORD,
    hostname: process.env.SM_DB_HOSTNAME || 'localhost',
    port: process.env.SM_DB_PORT || 27017,
    name: process.env.SM_DB_NAME || `smine-${process.env.NODE_ENV}`
  },
  admin: {
    email: process.env.SM_DB_ADMIN_EMAIL || 'admin@admin.com',
    pass: process.env.SM_DB_ADMIN_PASS || 'password'
  },
  api: {
    port: process.env.SM_API_PORT || 3000,
    secret: process.env.SM_API_SECRET || 'thisisasecret'
  },
  mailer: {
    auth: {
      user: process.env.SM_MAILER_USER,
      pass: process.env.SM_MAILER_PASS
    }
  },
  bcrypt: {
    salt: {
      rounds: 10
    }
  },
  miner: {
    supported: {
      'xmr-stak': {
        coins: ['monero', 'aeon', 'masari', 'loki']
      },
      bminer: {
        coins: ['grin']
      }
    }
  },
  gpu: {
    api: {
      port: process.env.SM_GPU_API_PORT || 6969,
      timeout: process.env.SM_GPU_API_TIMEOUT || 5000,
      retries: process.env.SM_GPU_API_RETRIES || 2
    }
  }
};
