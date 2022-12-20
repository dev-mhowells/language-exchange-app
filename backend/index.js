const express = require("express")
require('dotenv').config()
const password = process.env.DATABASE_PASSWORD
const app = express()
const port = 5000

// Set up mongoose connection
const mongoose = require("mongoose");
// add database name in here manually - language exchange
const mongoDB = `mongodb+srv://admin:${password}@cluster0.zewjklq.mongodb.net/language-exchange?retryWrites=true&w=majority
`;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// middleware

// req.body will always be undefined without below middleware line
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/', require('./routes/root'))
app.use('/register', require('./routes/register'))
app.use('/login', require('./routes/login'))
app.use('/user', require('./routes/user'))

console.log('state:', mongoose.connection.readyState)

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})