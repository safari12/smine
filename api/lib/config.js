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
    port: process.env.SM_API_PORT || 3000
  }
}
