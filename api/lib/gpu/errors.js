class GPUApiNotRunningError extends Error {
  constructor() {
    super('nvidia gpu api not running');
  }
}

class GPUApiRefusedError extends Error {
  constructor() {
    super('could not connect to nvidia gpu api');
  }
}

class GPUSyncCardsError extends Error {
  constructor(reason) {
    super(`error getting gpu card stats: ${reason}`);
  }
}

class GPUPowerLimitCardsError extends Error {
  constructor(reason) {
    super(`error power limiting gpu cards: ${reason}`);
  }
}

module.exports = {
  GPUApiNotRunningError,
  GPUApiRefusedError,
  GPUSyncCardsError,
  GPUPowerLimitCardsError
};
