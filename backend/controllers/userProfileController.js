const User = require('../models/user')
const Entry = require('../models/entry')
const mongoose = require('mongoose')

exports.index = async (req, res) => {
    const currentUser = await User.findById(req.user.id)
    res.status(200).json(currentUser)
}

exports.createEntry = async (req, res) => {

    try {

        const currentUser = await User.findById(req.user.id)
        const entry = new Entry(req.body)
        entry.save()
        const filter = {_id: req.user.id}
        const newEntries = [...currentUser.entries, entry]
        await User.findOneAndUpdate(filter, {entries: newEntries})

        res.status(200).json(entry)

    } catch(error) {

        res.status(400).json({error: error.message})
    }
}