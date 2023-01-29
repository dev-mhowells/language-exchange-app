const mongoose = require('mongoose')
const { ObjectId } = require('mongodb')
const Schema = mongoose.Schema

const CorrectionSchema = new Schema({
    user_id: {type: ObjectId, ref: "User"},
    entry_id: {type: ObjectId, ref: "Entry"},
    corrections: {type: Array, required: true}
})

module.exports = mongoose.model("Correction", CorrectionSchema)