const User = require('../models/user')

async function test() {
    try {
        const user = await User.find()
        console.log(user)
    } catch(e) {
        console.log(e.message)
    }
}

// export profile home page controller as function named index
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