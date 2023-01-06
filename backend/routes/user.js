const express = require('express')
const router = express.Router()

// require controller module
const user_controller = require('../controllers/userController')

router.get('/', user_controller.index)

// test user creation
// router.post('/create', user_controller.create_user)

// login route
router.post('/login', user_controller.loginUser)

//register router
router.post('/register', user_controller.registerUser)

module.exports = router