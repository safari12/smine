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
    },
    'required': [
      'user',
      'pass'
    ]
  },
  emailSchema: {
    'id': '/email',
    'type': 'object',
    'properties': {
      'host': { 'type': 'string' },
      'port': { 'type': 'integer' },
      'recipients': { 'type': 'array' },
      'auth': { '$ref': '/auth'}
    },
    'required': [
      'host',
      'port',
      'recipients',
      'auth'
    ]
  },
  discoverySchema: {
    'id': '/discovery',
    'type': 'object',
    'properties': {
      'number_of_rigs': { 'type': 'integer' },
      'hostname': { '$ref': '/hostname' },
      'api': { '$ref': '/api'}
    },
    'required': [
      'number_of_rigs',
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
      'endpoint': { 'type': 'string' },
      'timeout': { 'type': 'integer' },
      'max_attempts': { 'type': 'integer' },
      'retry_delay': { 'type': 'integer' }
    },
    'required': [
      'port',
      'endpoint'
    ]
  }
}