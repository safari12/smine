module.exports = {
  rootSchema: {
    'id': '/config',
    'type': 'object',
    'properties': {
      'discovery': { '$ref': '/discovery' },
      'email': { '$ref': '/email' }
    },
    'required': ['discovery', 'email']
  },
  authSchema: {
    'id': '/auth',
    'type': 'object',
    'properties': {
      'user': { 'type': 'string' },
      'pass': { 'type': 'string' }
    }
  },
  emailSchema: {
    'id': '/email',
    'type': 'object',
    'properties': {
      'host': { 'type': 'string' },
      'port': { 'type': 'integer' },
      'recipients': { 'type': 'array' },
      'auth': { '$ref': '/auth'}
    }
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