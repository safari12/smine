const _ = require('lodash');

const Rig = require('../lib/rig');

function generate() {
  const ids = _.range(1, 10);
  return _.map(ids, id => {
    return new Rig({
      name: `s-m-${Rig.getId(id)}`
    });
  });
}

module.exports = {
  generate: generate
};
