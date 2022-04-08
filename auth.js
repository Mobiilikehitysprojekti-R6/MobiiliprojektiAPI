const BasicStrategy = require('passport-http').BasicStrategy
const bcrypt = require('bcrypt');
const db = require('./database')
const strategy = new BasicStrategy((username, password, done) => {
    db.query(`SELECT * FROM Users WHERE Username="${username}"`, (error, result) => {
        if(error) console.log(error.code)
        if(result.length == 0){
            done(null, false)
        } else {
            if(bcrypt.compareSync(password, result[0].Password) === true) {
                done(null, {      
                    idUser: result[0].idUser,
                    username: result[0].Username,
                    premiumAccount: result[0].PremiumAccount
                })
            } else {
                done(null, false);
            }
        }
    })
  })

  module.exports = strategy