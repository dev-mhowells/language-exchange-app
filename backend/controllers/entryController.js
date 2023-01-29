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
        // console.log("CREATE CORRECTION RAN WITH", req.body)
        // const currentUser = await User.findById(req.user.id)
        const correction = new Correction(req.body)
        // console.log("THIS IS THE CORRECTION", correction)
        correction.save()
        console.log('this is the IDDD', req.body.entry_id)
        const entry = await Entry.findById(req.body.entry_id)
        console.log('THIS IS THE ENTRY', entry.id)
        const filter = {_id: entry.id}
        console.log('ENTRY>CORRECCTION', entry)
        const newCorrections = [...entry.corrections, correction]
        await Entry.findOneAndUpdate(filter, {corrections: newCorrections})

        res.status(200).json(correction)

    } catch(error) {

        res.status(400).json({error: error.message})
    }
}