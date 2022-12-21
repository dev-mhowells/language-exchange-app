require('dotenv').config({path: './.env.test'})

const chai = require('chai')
const expect = chai.expect
const should = chai.Should
const chaiHttp = require('chai-http')
const { default: mongoose } = require('mongoose')
// this gets the exported app.listen
const app = require('../index.js')
const User = require('../models/user')

chai.use(chaiHttp)

before((done) => {
    User.deleteMany({}, function(err) {})
    done()
})

// after((done) => {
//     User.deleteMany({}, function(err) {})
//     done()
//     mongoose.connection.close()
// })

describe('UserController', function() {
    it('successfully registers a user', function(done) {

        const user = {
            email: 'testemail1@email.com',
            password: "something",
        }

        chai.request(app)
        .post('/user/register')
        .send(user)
        .end((err, res) => {
            expect(res.status).to.equal(200)
            done()
        })

    })
})