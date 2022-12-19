const User = require('../models/user')
const jwt = require('jsonwebtoken')
const {secret} = require('../apiKeys')

// takes Mongo id which will be part of token payload
// secret is local secret used to encode data
// third param is options, can set expiration for login
const createToken = (_id) => {
    // returns a token
    return jwt.sign({_id}, secret, { expiresIn: '3d'})
}


exports.loginUser = async (req, res) => {
    
    res.json({message: 'login user'})
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

