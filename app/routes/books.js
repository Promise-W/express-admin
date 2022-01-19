var express = require('express')
var router = express.Router()
var book = require('../controllers/book')

router.get('/table/list', book.list)

module.exports = router