const ApplicationError = require('./application-error')

class BadCredentialsError extends ApplicationError {
	constructor (message) {
		super(message || 'Bad Credentials.', 401)
	}
}

module.exports = BadCredentialsError
