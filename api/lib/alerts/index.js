const _ = require('lodash/fp');

class Alerts {
  constructor(conditions) {
    this.conditions = conditions;
  }

  getTriggeredConditions(sourceItems, updatedItems) {
    updatedItems = _.keyBy(updatedItems);

    return _.pipe(
      _.map(i => [i, updatedItems[i._id]]),
      _.map(a => _.map(c => c(a[0], a[1]))(this.conditions)),
      _.flatten(),
      _.filter('triggered')
    )(sourceItems);
  }
}

module.exports = Alerts;
