const express = require('express')
const dotenv = require('dotenv')
dotenv.config();
const app = express()
const db = require('./database')
const passport = require('passport')
const BasicStrategy = require('passport-http').BasicStrategy
const bcrypt = require('bcrypt');
app.use(express.json())

passport.use(new BasicStrategy((email, password, done) => {
  db.query(`SELECT * from users WHERE Username="${email}"`, (error, result) => {
      if(error) console.log(error.code)
      if(result.length == 0){
          done(null, false)
      } else {
          if(bcrypt.compareSync(password, result[0].Password) === true) {
              done(null, {      
                  idUser: result[0].idUser,
                  username: result[0].Username
              })
          } else {
              done(null, false);
          }
      }
  })
}))
app.use(passport.initialize());
// Db connection test
db.connect((err) => {
    if (err) {
      console.log('error: ' + err.message)
    }
    console.log('Connected to the MySQL server.');
  });

// Routes 
app.use('/register', require('./routes/register'))
app.use('/login', passport.authenticate('basic', {session: false}), require('./routes/login'))


const port = 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})