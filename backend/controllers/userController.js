const User = require('../models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const secret = process.env.BCRYPT_SECRET

// takes Mongo id which will be part of token payload
// secret is local secret used to encode data
// third param is options, can set expiration for login
const createToken = (_id) => {
    // returns a token
    const token = jwt.sign({_id}, secret, { expiresIn: '3d'})
    return token
}


exports.loginUser = async (req, res) => {

    const {email, password} = req.body

    try {
        // will return the user for given credentials
        const user = await User.login(email, password)
        // create token
        const token = createToken(user._id)
        // respond with email and token
        res.status(200).json({email, token})

    } catch(error) {
        // if error, throw error created in login method
        res.status(400).json({error: error.message})
    }
}

exports.registerUser = async (req, res) => {

    const {email, password} = req.body

    try {
        // register is custom static method
        const user = await User.register(email, password)

        // create token on register using user just created's id
        const token = createToken(user._id)

        // send response -- email and token
        res.status(200).json({email, token})

    } catch (error) {
        // if error, throw error created in register method
        // tried above
        res.status(400).json({error: error.message})
    }
}

// exports profile home page controller as function named index
exports.index = (req, res) => {
    User.find({name: 'Brian'}).then(data => {console.log(data); res.json(data)})
}

exports.create_user = (req, res) => {
    res.send('create user test')
    const NewUser = new User({
        email: 'email@email.com',
        name: 'Brian',
        age: '24',
        about: 'This is some random text about Brian which I hope will push to the database'
    })

    NewUser.save().then(() => {
        res.redirect('/user').catch(err => console.log(err))
    })
}

