const User = require('../models/user')

exports.loginUser = async (req, res) => {
    console.log(req.body)
    res.json({message: 'login user'})
}

exports.registerUser = async (req, res) => {

    const {email, password} = req.body

    try {
        // register is custom static method
        const user = await User.register(email, password)

        // send response -- email and user object document
        res.status(200).json({email, user})
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

