const fs = require('fs')
const Validator = require('jsonschema').Validator
const schema = require('./schema')

class ConfigParser {
  readFile(filePath) {
    const config = JSON.parse(fs.readFileSync(filePath))
    this.validate(config)
    return config
  }

  validate(config) {
    const v = new Validator()
    v.addSchema(schema.authSchema, '/auth')
    v.addSchema(schema.emailSchema, '/email')
    v.addSchema(schema.discoverySchema, '/discovery')
    v.addSchema(schema.apiSchema, '/api')
    v.addSchema(schema.hostnameSchema, '/hostname')
    v.validate(config, schema.rootSchema, {
      throwError: true
    })
  }
}

module.exports = new ConfigParser()
