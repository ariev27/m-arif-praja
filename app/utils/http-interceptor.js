'use strict'
const constant = require('../utils/constants')
const jsonUtil = require('../utils/JsonUtil')
const securityService = require('../services/security')

class HttpInterceptor {

    constructor() {
    }

    validateToken(req, res, next) {
        if (!req.headers.token) {
            res.status(401).json(jsonUtil(constant.UNAUTHORIZED_CODE, constant.TOKEN_MISSING, null))
        } else {
            securityService.validateToken(req.headers.token)
                .then(result => {
                    if (result) next()
                })
                .catch(next)
        }
    }
}

module.exports = new HttpInterceptor()
