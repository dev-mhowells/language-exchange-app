const User = require('../models/user')
const Entry = require('../models/entry')
const mongoose = require('mongoose')

exports.index = async (req, res) => {

    try {

    const currentUser = await User.findById(req.user.id)
    currentUser.entries = await Entry.find({'user_id': { $in: currentUser} })
    res.status(200).json(currentUser)

    } catch(error) {

        res.status(400).json({error: error.message})

    }
}

