let express = require('express')
let router = express.Router()
let vehicleData = require('../controllers/vehicle-data')

router.get('/', vehicleData.getAllVehicle)
router.post('/', vehicleData.postVehicle)
router.put('/:id', vehicleData.putVehicle)
router.delete('/:id', vehicleData.deleteVehicle)

module.exports = router
