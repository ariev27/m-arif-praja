'use strict'
const model = require('../models/vehicle-data')
const redis = require('../utils/redis-cache')
const constant = require('../utils/constants')
const redisKey = constant.REDIS_KEYS
let jsonUtil = require('../utils/JsonUtil')

class VehicleDataController {

    getAllVehicle(req, res, next) {
        redis.get(redisKey.VEHICLE_DATA, (err, data) => {
            if (data) {
                data = JSON.parse(data)
                res.status(200).json(jsonUtil(constant.SUCCESS_CODE, constant.SUCCESS, data))
            } else {
                model.find()
                    .then(result => {
                        if (result.length > 0) {
                            redis.set(redisKey.VEHICLE_DATA, JSON.stringify(result))
                            res.status(200).json(jsonUtil(constant.SUCCESS_CODE, constant.SUCCESS, result))
                        } else {
                            res.status(200).json(jsonUtil(constant.SUCCESS_CODE, constant.DATA_NOT_FOUND, null))
                        }
                    })
                    .catch(next)
            }
        })
    }

    postVehicle(req, res, next) {
        let userData = new model({
            id: req.body.id,
            serialNo: req.body.serialNo,
            name: req.body.name,
            type: req.body.type,
            model: req.body.model
        })
        userData.save()
            .then(result => {
                if (result) {
                    redis.del(redisKey.VEHICLE_DATA)
                    res.status(200).json(jsonUtil(constant.SUCCESS_CODE, constant.SUCCESS, result))
                } else {
                    res.status(200).json(jsonUtil(constant.SUCCESS_CODE, constant.DATA_NOT_FOUND, null))
                }
            })
            .catch(next)
    }

    putVehicle(req, res, next) {
        model.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    serialNo: req.body.serialNo,
                    name: req.body.name,
                    type: req.body.type,
                    model: req.body.model
                }
            }
        )
            .then(result => {
                if (result) {
                    redis.del(redisKey.VEHICLE_DATA)
                    res.status(200).json(jsonUtil(constant.SUCCESS_CODE, constant.SUCCESS, result))
                } else {
                    res.status(200).json(jsonUtil(constant.SUCCESS_CODE, constant.DATA_NOT_FOUND, null))
                }
            })
            .catch(next)
    }

    deleteVehicle(req, res, next) {
        model.findByIdAndDelete(req.params.id)
            .then(result => {
                if (result) {
                    redis.del(redisKey.VEHICLE_DATA)
                    res.status(200).json(jsonUtil(constant.SUCCESS_CODE, constant.SUCCESS, result))
                } else {
                    res.status(200).json(jsonUtil(constant.SUCCESS_CODE, constant.DATA_NOT_FOUND, null))
                }
            })
            .catch(next)
    }
}

module.exports = new VehicleDataController
