var express = require('express')
var router = express.Router()
var user = require('../controllers/user')

router.get('/user/info', user.info)

router.post('/user/list', user.list)

module.exports = router
