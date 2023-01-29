const Entry = require('../models/entry')
const Correction = require('../models/correction')

exports.index = async (req, res) => {

    try {

        // const entries = await Entry.find().limit(5)
        const entries = await Entry.find().populate('corrections').exec()

        res.status(200).json(entries)

    } catch(error) {

        res.status(400).json({error: error.message})

    }

}