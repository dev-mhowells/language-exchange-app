const express = require("express")
const app = express()
const port = 5000

app.use('/', require('./routes/root'))
app.use('/register', require('./routes/register'))
app.use('/login', require('./routes/login'))
app.use('/profile', require('./routes/profile'))

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})