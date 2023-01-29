const mongoose = require('mongoose')
const { ObjectId } = require('mongodb')
// const Schema = mongoose.Schema

const EntrySchema = mongoose.Schema({
    user_id: {type: ObjectId, ref: "User"},
    date: {type: String, required: true},
    title: {type: String, required: true},
    entry: {type: String, required: true},
    corrections: [{type: ObjectId, ref: "Correction"}],
})

module.exports = mongoose.model("Entry", EntrySchema)