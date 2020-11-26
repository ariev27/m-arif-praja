const ApplicationError = require('./application-error')

class UnauthorizedError extends ApplicationError {

  constructor (message) {
    super(message || 'Unauthorized access.', 401)
  }

}

module.exports = UnauthorizedError
