let express = require('express')
let router = express.Router()
let userDataController = require('../controllers/user-data')

router.get('/', userDataController.findAllUser)
router.post('/', userDataController.createUser)
router.put('/:id', userDataController.editUser)
router.delete('/:id', userDataController.deleteUser)

router.get('/account-number/:id', userDataController.findUserByAccountNumber)
router.get('/identity-number/:id', userDataController.findUserByIdentityNumber)

module.exports = router
