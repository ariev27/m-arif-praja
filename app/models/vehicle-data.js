const mongoose = require('mongoose')

const vehicleDataSchema = new mongoose.Schema({
    id: Number,
    serialNo: Number,
    name: String,
    type: String,
    model: String
})

const vehicleData = mongoose.model('vehicleData', vehicleDataSchema, 'vehicleData')

module.exports = vehicleData
