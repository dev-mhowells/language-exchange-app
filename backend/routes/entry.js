const express = require('express')
const router = express.Router()

const entry_controller = require('../controllers/entryController')

const requireAuth = require('../middleware/requireAuth')

// fires requireAuth before all other router.get, router.post
// below and means they need to be auth before allowed to access
// these routes
router.use(requireAuth)

// router.get('/', entry_controller.index)

router.post('/createEntry', entry_controller.createEntry)

router.get('/getEntries', entry_controller.getEntries)

router.post('/deleteEntry', entry_controller.deleteEntry)

router.get('/getEntryCorrections', entry_controller.getEntryCorrections)

router.post('/createCorrection', entry_controller.createCorrection)

module.exports = router
