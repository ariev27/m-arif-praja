const ApplicationError = require('./application-error')

class ForbiddenError extends ApplicationError {

	constructor (message) {
		super(message || `Forbidden access.`, 403)
	}

}

module.exports = ForbiddenError
