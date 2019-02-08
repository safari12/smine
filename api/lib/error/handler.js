class ErrorHandler {
  // eslint-disable-next-line no-unused-vars
  static defaultError(error, req, res, next) {
    res.status(error.status || 500).json({
      error: error.message
    })
  }

  static validationError(error, req, res, next) {
    if (error.name === 'ValidationError') {
      error.status = 400
    }
    next(error)
  }
}

module.exports = ErrorHandler
