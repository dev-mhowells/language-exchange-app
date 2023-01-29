const express = require('express')
const router = express.Router()

const entry_controller = require('../controllers/feedController')

const requireAuth = require('../middleware/requireAuth')

// fires requireAuth before all other router.get, router.post
// below and means they need to be auth before allowed to access
// these routes
router.use(requireAuth)

router.get('/', entry_controller.index)

module.exports = router
