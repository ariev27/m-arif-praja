'use strict'
let self
const UnauthorizedError = require('../errors/unauthorized-error')
const userDataService = require('../services/user-data')
const jwtService = new (require('../services/jwt-service'))()
const constant = require('../utils/constants')

class SecurityService {

    constructor() {
        self = this
    }

    login(userName, password) {
        return userDataService.findOneUser(userName, password)
            .then(async result => {
                if (result) {
                    let payload = await this.setUserPayload(result)
                    return jwtService.generate(payload)
                } else {
                    throw new UnauthorizedError(constant.WRONG_USERNAME_PASSWORD)
                }
            })
    }

    validateToken(token) {
        if (!token) {
            throw new UnauthorizedError(constant.NOT_AUTHENTICATED)
        } else {
            return jwtService.validate(token)
                .then(payload => {
                    return payload
                })
        }
    }

    setUserPayload(userData) {
        let payload = {}
        payload._id = userData._id
        payload.id = userData.id
        payload.userName = userData.userName
        payload.accountNumber = userData.accountNumber
        payload.emailAddress = userData.emailAddress
        payload.identityNumber = userData.identityNumber
        return payload
    }
}

module.exports = new SecurityService()
