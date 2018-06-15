module.exports = {
  rootSchema: {
    'id': '/config',
    'type': 'object',
    'properties': {
      'discovery': { '$ref': '/discovery' }
    },
    'required': ['discovery']
  },
  discoverySchema: {
    'id': '/discovery',
    'type': 'object',
    'properties': {
      'number_of_miners': { 'type': 'integer' },
      'hostname': { '$ref': '/hostname' },
      'api': { '$ref': '/api'}
    },
    'required': [
      'number_of_miners',
      'hostname',
      'api'
    ]
  },
  hostnameSchema: {
    'id': '/hostname',
    'type': 'object',
    'properties': {
      'prefix': { 'type': 'string' }
    },
    'required': [
      'prefix'
    ]
  },
  apiSchema: {
    'id': '/api',
    'type': 'object',
    'properties': {
      'port': { 'type': 'integer' },
      'endpoint': { 'type': 'string '}
    },
    'required': [
      'port',
      'endpoint'
    ]
  }
}