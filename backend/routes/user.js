const express = require('express')
const router = express.Router()

// require controller module
const user_controller = require('../controllers/userController')

router.get('/', user_controller.index)

router.post('/create', user_controller.create_user)

module.exports = router