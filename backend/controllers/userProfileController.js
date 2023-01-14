const User = require('../models/user')
const mongoose = require('mongoose')

exports.index = async (req, res) => {
    console.log('USER PROFILE INDEX RANx')
    const foundUser = await User.findById(req.user.id)
    res.status(200).json(foundUser)
}

exports.loadProfile = async (req, res) => {

}