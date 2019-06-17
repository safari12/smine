const _ = require('lodash/fp');

function checkGPUErrors(source, updated) {
  return {
    triggered: !source.gpu.error && updated.gpu.error,
    message: `${source.hostname} - there are gpu errors: ${updated.gpu.error}`
  };
}

function checkGPUCardsWentDown(source, updated) {
  const sourceGpuCount = source.gpu.cards.length;
  const updatedGpuCount = updated.gpu.cards.length;
  const diff = sourceGpuCount - updatedGpuCount;

  return {
    triggered: sourceGpuCount > updatedGpuCount,
    message: `${source.hostname} - ${diff} gpu cards went down`
  };
}

function checkRigWentDown(source, updated) {
  return {
    triggered: source.pingable && !updated.pingable,
    message: `${source.hostname} went down, not pingable`
  };
}

function checkMinersWentDown(source, updated) {
  const sourceErrors = _.pipe(
    _.filter('error'),
    _.map('error')
  )(source.miners);
  const updatedErrors = _.pipe(
    _.filter('error'),
    _.map('error')
  )(updated.miners);

  return {
    triggered: !sourceErrors && updatedErrors,
    message: `${source.hostname} - ${_.join(', ')(updatedErrors)}`
  };
}

module.exports = [
  checkGPUErrors,
  checkGPUCardsWentDown,
  checkRigWentDown,
  checkMinersWentDown
];
