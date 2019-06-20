const _ = require('lodash/fp');
const conditions = require('./conditions');

class AlertActions {
  static check(source, updated) {
    const results = _.map(c => c(source, updated), conditions);
    return _.filter('triggered', results);
  }
}

module.exports = AlertActions;
