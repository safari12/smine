function checkGPUErrors(source, updated) {
  return {
    met: !source.gpu.error && updated.gpu.error,
    message: `there are gpu errors: ${updated.gpu.error}`
  };
}

function checkGPUCardsWentDown(source, updated) {
  const sourceGpuCount = source.gpu.cards.length;
  const updatedGpuCount = updated.gpu.cards.length;
  const diff = sourceGpuCount - updatedGpuCount;

  return {
    met: sourceGpuCount > updatedGpuCount,
    message: `${diff} gpu cards went down`
  };
}

function checkRigWentDown(source, updated) {
  return {
    met: source.pingable && !updated.pingable,
    message: 'rig went down, not pingable'
  };
}

module.exports = [checkGPUErrors, checkGPUCardsWentDown, checkRigWentDown];
