var express = require('express')
var router = express.Router()
var openAi = require('../controllers/openAi')

router.post('/openAi/getData', openAi.getAiData)

module.exports = router
