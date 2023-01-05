const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const SALT_ROUNDS = 10

// old schema for user..

// const UserSchema = new Schema({
//     email: {type: String, required: true, unique: true},
//     password: {type: String, required: true},
//     name: {type: String, required: true, minLength: 3, maxLength: 100},
//     age: {type: String, require: true},
//     about: {type: String, required: true, minLength: 10},
// })

const UserSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String, required: true, minLength: 3, maxLength: 100},
    age: {type: String, require: true},
    location: {type: String, require: true},
    // languages: {type: Array, require: true},
    about: {type: String, required: true, minLength: 10},
})

// statc signup method - creating own method here called signup
// when creating static method, can use 'this' to refer to the model
// it is used on (in this case, User - the model name we export it as)
// need to use regular function not arrow function here because need 'this' keyword
UserSchema.statics.register = async function(email, password, name, age, location, about) {
    // check if email exists in database
    const exists = await this.findOne({ email })

    // this error can be caught inside userController.js where
    // this signup method is called

    if(exists) {
        throw Error('Email already exists')
    }

    // hash password
    // creating salt and hashing takes time to complete so need await
    const salt = await bcrypt.genSalt(SALT_ROUNDS)
    // console.log(`salt: ${salt}`)
    // console.log(`password: ${password}`)
    const hash = await bcrypt.hash(password, salt)

    // create is a mongoose function
    // equal to: doc = new User({email, password}); await doc.save() 
    const user = await this.create({ email, password: hash, name, age, location, about })

    return user
}

// static login method
UserSchema.statics.login = async function(email, password) {

    if(!email || !password) {
        throw Error('Please provide both fields')
    }

    const user = await this.findOne({email})

    if(!user) {
        throw Error('Email not registered')
    }

    // compares hashed password text to hashed password value
    // in user object/ model
    const match = await bcrypt.compare(password, user.password)

    if(!match) {
        throw Error('password incorrect')
    }

    return user
} 

module.exports = mongoose.model("User", UserSchema)