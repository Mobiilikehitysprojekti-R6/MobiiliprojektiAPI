const db = require('../database');
const bcrypt = require('bcrypt');

exports.registerUser = (req, res) => {
    const salt = bcrypt.genSaltSync(5);
    const hashedPassword = bcrypt.hashSync(req.body.Password, salt);

    if(req.body.Username.length > 0 && req.body.Password.length > 0){
        db.query(`INSERT into users VALUES(null, "${req.body.Username}", "${hashedPassword}")`, (error, result) => {
            if(error){
                // Send error if username is taken
                if(error.code == "ER_DUP_ENTRY"){
                    res.send("Username is already taken")
                // Send error msg if something else is wrong
                } else {
                    res.send(error.message)
                }
            } else {
                res.send("Registered")
                console.log("Registered")
            }

        })
    } else {
        res.send("Failed to register. Check inputs.")
    }
}