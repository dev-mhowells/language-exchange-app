const User = require('../models/user')
const Entry = require('../models/entry')
const Correction = require('../models/correction')
const mongoose = require('mongoose')

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

exports.deleteEntry = async (req, res) => {

    try {

        const entryToDelete = req.body._id

        await Entry.deleteOne({ _id: entryToDelete })

        res.status(200).json({message: 'ok'})

    } catch(error) {

        res.status(400).json({error: error.message})
    }
}

// no longer necessary here as entries are gotten on profile
// page load

exports.getEntries = async (req, res) => {

    try {

        const currentUser = await User.findById(req.user.id)
        const entries = await Entry.find({'user_id': { $in: currentUser} })
        res.status(200).json(entries)

    } catch(error) {

        res.status(400).json({error: error.message})

    }

}

exports.createCorrection = async (req, res) => {

    try {
        const correction = new Correction(req.body)
        correction.save()
        const entry = await Entry.findById(req.body.entry_id)
        const filter = {_id: entry.id}
        const newCorrections = [...entry.corrections, correction]
        await Entry.findOneAndUpdate(filter, {corrections: newCorrections})

        res.status(200).json(correction)

    } catch(error) {

        res.status(400).json({error: error.message})
    }
}

exports.getEntryCorrections = async (req, res) => {

    try {

        const entry = await Entry.findById(req.body.entry_id)
        const corrections = await Correction.find({'entry_id': { $in: entry} })
        res.status(200).json(corrections)

    } catch(error) {

        res.status(400).json({error: error.message})
        
    }
}