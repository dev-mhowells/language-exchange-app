const jwt = require('jsonwebtoken')
const User = require('../models/user')

// invoke next function to move on to next peice of middleware
// or next handler e.g. in route (router.get('/smth', smth))

const requireAuth = async (req, res, next) => {
    // verify authenticated user
    // headers is content-type etc.
    // authorisation here from headers should contain token
    const  { authorization } = req.headers

    if(!authorization) {
        return res.status(401).json({error: 'Athorization token required'})
    }

    // authorization witll look like: 'Bearer asdhas.ashdouas.hoausdh'
    const token = authorization.split(' ')[1]

    try {
        // returns payload of token, grab ID from token payload
        const {_id} = jwt.verify(token, process.env.BCRYPT_SECRET)

        // here we attach a user property to the req object passed in
        // to this function so when we go to the next middleware - router.get('/smth', smth)
        // we will have access to the user property inside them
        // we want to find the user based on the ID and return that ID
        req.user = await User.findOne({_id}).select('_id')
        
        // fire next handler function
        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({error: 'Request is not authorized'})
    }
}

// to be exported to routes
module.exports = requireAuth