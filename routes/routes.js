const express = require('express')
const router = express.Router()
const question = require('../handlers/questions')
const login = require('../handlers/login')
const register = require('../handlers/register')

router.get('/quiz', question.quiz)
router.post('/login', login.getIn)
router.post('/register', register.signUp)
router.put('/gameover/:email/:points', login.pointUpdate)

module.exports = router