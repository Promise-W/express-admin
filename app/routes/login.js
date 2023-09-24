var express = require('express')
var router = express.Router()
var login = require('../controllers/login')

/* user login. */
router.post('/user/login', login.login)

router.post('/user/logout', login.logout)

module.exports = router
