'use strict'
const redis = require('../utils/redis-cache')
const constant = require('../utils/constants')
const redisKey = constant.REDIS_KEYS
const userDataService = require('../services/user-data')
let jsonUtil = require('../utils/JsonUtil')

class UserDataController {

    findAllUser(req, res, next) {
        redis.get(redisKey.USER_DATA, (err, data) => {
            if (data) {
                data = JSON.parse(data)
                res.status(200).json(jsonUtil(constant.SUCCESS_CODE, constant.SUCCESS, data))
            } else {
                userDataService.findAllUser()
                    .then(result => {
                        if (result) {
                            redis.set(redisKey.USER_DATA, JSON.stringify(result))
                            res.status(200).json(jsonUtil(constant.SUCCESS_CODE, constant.SUCCESS, result))
                        } else {
                            res.status(200).json(jsonUtil(constant.SUCCESS_CODE, constant.DATA_NOT_FOUND, null))
                        }
                    }).catch(next)
            }
        })
    }

    findUserByAccountNumber(req, res, next) {
        redis.get(redisKey.USER_DATA + 'accountNumber' + req.params.id, (err, data) => {
            if (data) {
                data = JSON.parse(data)
                res.status(200).json(jsonUtil(constant.SUCCESS_CODE, constant.SUCCESS, data))
            } else {
                userDataService.findUserByAccountNumber(req.params.id)
                    .then(result => {
                        if (result) {
                            redis.set(redisKey.USER_DATA + 'accountNumber' + req.params.id, JSON.stringify(result))
                            res.status(200).json(jsonUtil(constant.SUCCESS_CODE, constant.SUCCESS, result))
                        } else {
                            res.status(200).json(jsonUtil(constant.SUCCESS_CODE, constant.DATA_NOT_FOUND, null))
                        }
                    }).catch(next)
            }
        })
    }

    findUserByIdentityNumber(req, res, next) {
        redis.get(redisKey.USER_DATA + 'identityNumber' + req.params.id, (err, data) => {
            if (data) {
                data = JSON.parse(data)
                res.status(200).json(jsonUtil(constant.SUCCESS_CODE, constant.SUCCESS, data))
            } else {
                userDataService.findUserByIdentityNumber(req.params.id)
                    .then(result => {
                        if (result) {
                            redis.set(redisKey.USER_DATA + 'identityNumber' + req.params.id, JSON.stringify(result))
                            res.status(200).json(jsonUtil(constant.SUCCESS_CODE, constant.SUCCESS, result))
                        } else {
                            res.status(200).json(jsonUtil(constant.SUCCESS_CODE, constant.DATA_NOT_FOUND, null))
                        }
                    }).catch(next)
            }
        })
    }

    createUser(req, res, next) {
        userDataService.createUser(req.body)
            .then(result => {
                if (result) {
                    redis.del(redisKey.USER_DATA)
                    res.status(200).json(jsonUtil(constant.SUCCESS_CODE, constant.SUCCESS, result))
                }
            }).catch(next)
    }

    editUser(req, res, next) {
        userDataService.editUser(req.params.id, req.body)
            .then(result => {
                if (result) {
                    redis.del(redisKey.USER_DATA)
                    res.status(200).json(jsonUtil(constant.SUCCESS_CODE, constant.SUCCESS, result))
                } else {
                    res.status(200).json(jsonUtil(constant.SUCCESS_CODE, constant.DATA_NOT_FOUND, null))
                }
            }).catch(next)
    }

    deleteUser(req, res, next) {
        userDataService.deleteUser(req.params.id)
            .then(result => {
                if (result) {
                    redis.del(redisKey.USER_DATA)
                    res.status(200).json(jsonUtil(constant.SUCCESS_CODE, constant.SUCCESS, result))
                } else {
                    res.status(200).json(jsonUtil(constant.SUCCESS_CODE, constant.DATA_NOT_FOUND, null))
                }
            }).catch(next)
    }
}

module.exports = new UserDataController
