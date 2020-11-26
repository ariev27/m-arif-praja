let express = require('express')
let router = express.Router()
let security = require('../controllers/security')

router.get('/validate-token', security.validateToken)
router.post('/login', security.login)

module.exports = router
