const express = require('express')
const dotenv = require('dotenv')
dotenv.config();
const app = express()
const db = require('./database')
const passport = require('passport')
const BasicStrategy = require('./auth')

app.use(express.json())
passport.use("BasicStrategy", BasicStrategy);

// Db connection test
db.connect((err) => {
    if (err) {
      console.log('error: ' + err.message)
    } else {
      console.log('Connected to the MySQL server.')
    }
  });

// Routes 
app.use('/register', require('./routes/register'))
app.use('/login', passport.authenticate('BasicStrategy', {session: false}), require('./routes/login'))


const port = 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})