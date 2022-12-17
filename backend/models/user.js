const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: {type: String, required: true},
    name: {type: String, required: true, minLength: 3, maxLength: 100},
    age: {type: String, require: true},
    about: {type: String, required: true, minLength: 10},
})

module.exports = mongoose.model("User", UserSchema)