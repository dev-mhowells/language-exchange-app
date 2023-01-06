const User = require('../models/user')
const mongoose = require('mongoose')

exports.index = async (req, res) => {
    const user = await User.find({})
    const user1 = user[0]
    res.status(200).json(user1)
    // can access req.user from auth middleware but 
    // req.params is currently an empty object
    // console.log('THIS IS PARAMS', req.user._id)
    // const {user} = req.params
    // console.log('THIS IS ID', user)
    // User.find().then(data => {console.log(req.user._id); res.json(data)})
}

exports.loadProfile = async (req, res) => {

    
}