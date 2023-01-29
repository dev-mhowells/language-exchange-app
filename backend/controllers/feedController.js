const Entry = require('../models/entry')

exports.index = async (req, res) => {

    try {

        const entries = await Entry.find().limit(5)
        res.status(200).json(entries)

    } catch(error) {

        res.status(400).json({error: error.message})

    }

}