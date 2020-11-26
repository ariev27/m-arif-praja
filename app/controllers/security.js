'use strict'
const constant = require('../utils/constants')
let jsonUtil = require('../utils/JsonUtil')
let securityService = require('../services/security')

class SecurityController {

    validateToken(req, res, next) {
        if (!req.headers.token) {
            res.status(401).json(jsonUtil(constant.UNAUTHORIZED_CODE, constant.TOKEN_MISSING, null))
        } else securityService.validateToken(req.headers.token)
            .then(payload => res.status(200).json(jsonUtil(constant.SUCCESS_CODE, constant.SUCCESS, payload)))
            .catch(next)
    }

    login(req, res, next) {
        if (!req.body.userName && !req.body.userName) {
            res.status(401).json(jsonUtil(constant.UNAUTHORIZED_CODE, constant.TOKEN_MISSING, null))
        } else securityService.login(req.body.userName, req.body.password)
            .then(payload => res.status(200).json(jsonUtil(constant.SUCCESS_CODE, constant.SUCCESS, payload)))
            .catch(next)
    }
}

module.exports = new SecurityController()
