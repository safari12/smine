class GPUApiError extends Error {
  constructor(message) {
    super(message);
  }
}

class GPUCardsError extends Error {
  constructor(message) {
    super(message);
  }
}

class GPUApiNotRunningError extends GPUApiError {
  constructor() {
    super('nvidia gpu api not running');
  }
}

class GPUApiRefusedError extends GPUApiError {
  constructor() {
    super('could not connect to nvidia gpu api');
  }
}

class GPUSyncCardsError extends GPUCardsError {
  constructor(reason) {
    super(`error getting gpu card stats: ${reason}`);
  }
}

class GPUPowerLimitCardsError extends GPUCardsError {
  constructor(reason) {
    super(`error power limiting gpu cards: ${reason}`);
  }
}

module.exports = {
  GPUApiError,
  GPUApiNotRunningError,
  GPUApiRefusedError,
  GPUSyncCardsError,
  GPUPowerLimitCardsError
};
