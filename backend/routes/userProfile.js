const express = require('express')
const router = express.Router()

const userProfile_controller = require('../controllers/userProfileController')

const requireAuth = require('../middleware/requireAuth')

// fires requireAuth before all other router.get, router.post
// below and means they need to be auth before allowed to access
// these routes
router.use(requireAuth)

router.get('/', userProfile_controller.index)

router.post('/createEntry', userProfile_controller.createEntry)

module.exports = router