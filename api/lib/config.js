module.exports = {
  db: {
    username: process.env.SM_DB_USERNAME,
    password: process.env.SM_DB_PASSWORD,
    hostname: process.env.SM_DB_HOSTNAME || 'localhost',
    port: process.env.SM_DB_PORT || 27017,
    name: process.env.SM_DB_NAME || `smine-${process.env.NODE_ENV}`
  }
}