'use strict'
const model = require('../models/user-data')
const badRequestError = require('../errors/bad-request-error')
const constant = require('../utils/constants')

class SecurityService {

    constructor() {
    }

    findAllUser() {
        return model.find()
            .then(result => {
                if (result && result.length > 0) {
                    return result
                } else {
                    return null
                }
            }).catch(err => console.log(err))
    }

    findUserByAccountNumber(accountNumber) {
        return model.find({accountNumber: accountNumber})
            .then(result => {
                if (result && result.length > 0) {
                    return result
                } else {
                    return null
                }
            }).catch(err => console.log(err))
    }

    findUserByIdentityNumber(identityNumber) {
        return model.find({identityNumber: identityNumber})
            .then(result => {
                if (result && result.length > 0) {
                    return result
                } else {
                    return null
                }
            }).catch(err => console.log(err))
    }

    findOneUser(userName, password) {
        return model.findOne({userName: userName, password: password})
            .then(result => {
                if (result) {
                    return result
                } else {
                    return null
                }
            })
    }

    createUser(user) {
        if (!user.userName && !user.password) {
            throw new badRequestError(constant.USERNAME_PASSWORD_EMPTY)
        } else {
            let userData = new model({
                id: user.id,
                userName: user.userName,
                password: user.password,
                accountNumber: user.accountNumber,
                emailAddress: user.emailAddress,
                identityNumber: user.identityNumber
            })
            return userData.save()
                .then(result => {
                    if (result) {
                        return result
                    } else {
                        return null
                    }
                }).catch(err => console.log(err))
        }
    }

    editUser(id, user) {
        if (!id) {
            throw new badRequestError(constant.ID_EMPTY)
        } else {
            return model.findByIdAndUpdate(
                id,
                {
                    $set: {
                        userName: user.userName,
                        accountNumber: user.accountNumber,
                        emailAddress: user.emailAddress,
                        identityNumber: user.identityNumber
                    }
                }
            ).then(result => {
                if (result) {
                    return result
                } else {
                    return null
                }
            }).catch(err => console.log(err))
        }
    }

    deleteUser(id) {
        return model.findByIdAndDelete(id)
            .then(result => {
                if (result) {
                    return result
                } else {
                    return null
                }
            }).catch(err => console.log(err))
    }
}

module.exports = new SecurityService()
