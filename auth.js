const BasicStrategy = require('passport-http').BasicStrategy
const bcrypt = require('bcrypt');
const db = require('./database')
const strategy = new BasicStrategy((email, password, done) => {
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
  })

  module.exports = strategy