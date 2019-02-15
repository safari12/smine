const _ = require('lodash')

module.exports = {
  generate: function() {
    return _.map(_.range(10), i => {
      return {
        name: `config ${i}`,
        api: {
          endpoint: '/blah',
          port: 6969
        },
        card: {
          count: i
        },
        power: {
          limit: i
        }
      }
    })
  }
}
