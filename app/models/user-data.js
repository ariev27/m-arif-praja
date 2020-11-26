const mongoose = require('mongoose')

const userDataSchema = new mongoose.Schema({
    id: Number,
    userName: String,
    password: String,
    accountNumber: Number,
    emailAddress: String,
    identityNumber: String
})

const userData = mongoose.model('userData', userDataSchema, 'userData')

module.exports = userData
