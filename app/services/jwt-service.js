'use strict'
const jwt = require('jsonwebtoken')
const BadCredentialsError = require('../errors/bad-credentials-error')
const constant = require('../utils/constants')

class JwtService {

    constructor() {
        this.jwtSecret = process.env.JWT_SECRET
        this.jwtOptions = {
            algorithm: 'HS256',
            expiresIn: parseInt(process.env.TOKEN_EXP) * 1000,
            issuer: process.env.AUTHOR,
        }
    }

    generate(payload) {
        return new Promise((resolve, reject) => {
            jwt.sign(payload, this.jwtSecret, this.jwtOptions, (err, token) => {
                if (err || !token) reject(err)
                else resolve({token: token})
            })
        })
    }

    validate(token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, this.jwtSecret, (err, decoded) => {
                if (decoded && !err) resolve(decoded)
                else {
                    let jwtError = constant.TOKEN_NOT_VALID
                    if (err.name === 'TokenExpiredError') jwtError = constant.TOKEN_EXPIRED
                    reject(new BadCredentialsError(jwtError))
                }
            })
        })
    }
}

module.exports = JwtService
