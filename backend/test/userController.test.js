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

beforeAll((done) => {
    User.deleteMany({}, function(err) {})
    done()
})

afterAll((done) => {
    User.deleteMany({}, function(err) {})
    done()
    mongoose.connection.close()
})

describe('POST /register', () => {

    it('returns an email and a token', (done) => {

        const user = {
            email: 'testemail1@email.com',
            password: "something",
        }

        chai.request(app)
        .post('/user/register')
        .send(user)
        .end((err, res) => {
            expect(res.status).to.equal(200)
            expect(res.body.email).to.equal('testemail1@email.com')
            expect(res.body.token).to.not.be.undefined
            done()
        })

    })

    it('adds a user to the database', (done) => {

        const user = {
            email: 'testemail2@email.com',
            password: "something",
        }

        chai.request(app)
        .post('/user/register')
        .send(user)
        .end((err, res) => {
            expect(res.status).to.equal(200)
            
            User.findOne({'email': 'testemail2@email.com'}, 
            'email password',
            (err, foundUser) => {
                expect(foundUser.email).to.equal('testemail2@email.com')
                expect(foundUser.password).to.not.be.undefined
                done()
            })
        })

    })

    it('fails when email already exists', (done) => {

        const user = {
            email: 'testemail2@email.com',
            password: "something",
        }

        chai.request(app)
        .post('/user/register')
        .send(user)
        .end((err, res) => {
            expect(res.status).to.equal(400)
            expect(res.body.error).to.equal('Email already exists')
            done()
        })
    })
})

describe('POST /login', () => {
    it('returns an email and token', (done) => {
        const user = {
            email: 'testemail1@email.com',
            password: 'something'
        }
        chai.request(app)
        .post('/user/login')
        .send(user)
        .end((err, res) => {
            expect(res.status).to.equal(200)
            expect(res.body.email).to.equal(user.email)
            expect(res.body.token).to.not.be.undefined
            done()
        })
    })
    it('errors if email not provided', (done) => {
        const user = {
            email: '',
            password: 'something'
        }
        chai.request(app)
        .post('/user/login')
        .send(user)
        .end((err, res) => {
            expect(res.status).to.equal(400)
            expect(res.body.error).to.equal('Please provide both fields')
            done()
        })
    })
})