const fs = require('fs')
const Validator = require('jsonschema').Validator
const schema = require('./schema')

class ConfigParser {
  readFile(filePath) {
    return JSON.parse(fs.readFileSync(filePath))
  }

  validate(config) {
    const v = new Validator()
    v.addSchema(schema.discoverySchema, '/discovery')
    v.addSchema(schema.apiSchema, '/api')
    v.addSchema(schema.hostnameSchema, '/hostname')
    v.validate(config, schema.rootSchema, {
      throwError: true
    })
  }
}

module.exports = new ConfigParser()
