const express = require('express')
const router = express.Router()

// this is /register
router.get("/", (req, res) => {
    res.send("register page")
})

module.exports = router