const { createLogger, format, transports } = require('winston')
const { combine, timestamp, label, printf, colorize } = format

const myFormat = printf(info => {
  return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`
})

const logger = createLogger({
  format: combine(
    colorize(),
    label({ label: 'smine' }),
    timestamp(),
    myFormat
  ),
  transports: [new transports.Console({
    handleExceptions: true
  })]
})

module.exports = logger
