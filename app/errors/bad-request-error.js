const ApplicationError = require('./application-error')

class BadRequestError extends ApplicationError {

	constructor (message) {
		super(message || 'Bad request.', 400)
	}
}

module.exports = BadRequestError
