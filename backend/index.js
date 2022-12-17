const express = require("express")
const pass = require('./apiKeys')
const app = express()
const port = 5000

// Set up mongoose connection
const mongoose = require("mongoose");
const mongoDB = `mongodb+srv://admin:${pass}@cluster0.zewjklq.mongodb.net/?retryWrites=true&w=majority
`;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));


app.use('/', require('./routes/root'))
app.use('/register', require('./routes/register'))
app.use('/login', require('./routes/login'))
app.use('/user', require('./routes/user'))

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})