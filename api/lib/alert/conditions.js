const _ = require('lodash/fp');

function checkGPUApiErrors(source, updated) {
  return {
    triggered:
      updated.pingable && !source.gpu.error.api && updated.gpu.error.api,
    message: `${source.hostname} - ${updated.gpu.error.api}`
  };
}

function checkGPUCardErrors(source, updated) {
  return {
    triggered:
      updated.pingable && !source.gpu.error.cards && updated.gpu.error.cards,
    message: `${source.hostname} - ${updated.gpu.error.cards}`
  };
}

function checkGPUCardsWentDown(source, updated) {
  const sourceGpuCount = source.gpu.cards.length;
  const updatedGpuCount = updated.gpu.cards.length;
  const diff = sourceGpuCount - updatedGpuCount;

  return {
    triggered:
      updated.pingable &&
      !updated.gpu.error.api &&
      !updated.gpu.error.cards &&
      sourceGpuCount > updatedGpuCount,
    message: `${source.hostname} - ${diff} gpu cards went down silently`
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
    triggered: updated.pingable && !sourceErrors && updatedErrors,
    message: `${source.hostname} - ${_.join(', ')(updatedErrors)}`
  };
}

module.exports = [
  checkGPUApiErrors,
  checkGPUCardErrors,
  checkGPUCardsWentDown,
  checkRigWentDown,
  checkMinersWentDown
];
