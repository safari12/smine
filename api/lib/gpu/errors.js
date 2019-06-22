class TypeError extends Error {
  constructor(message, type) {
    super(message);
    this.type = type;
  }

  toObject() {
    return {
      message: this.message,
      type: this.type
    };
  }
}

class GPUApiError extends TypeError {
  constructor(message) {
    super(message, 'api');
  }
}

class GPUCardsError extends TypeError {
  constructor(message) {
    super(message, 'cards');
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
