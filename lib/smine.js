const cparser = require('./config/parser')

module.exports = (configPath) => {
  const config = cparser.readFile(configPath)
  cparser.validate(config)
}
