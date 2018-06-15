const fs = require('fs')

class ConfigParser {
  readFile(filePath) {
    return JSON.parse(fs.readFileSync(filePath))
  }

  validate(config) {
    if (config.discovery == nil) {
      throw
    }
  }
}

module.exports = new ConfigParser()
