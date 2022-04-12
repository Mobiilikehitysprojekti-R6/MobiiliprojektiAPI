const db = require('../database');
const bcrypt = require('bcrypt');

exports.registerUser = (req, res) => {
    console.log(req.body);
    const salt = bcrypt.genSaltSync(5);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    if(req.body.username.length > 0 && req.body.password.length > 0){
        db.query(`INSERT INTO Users VALUES(null, "${req.body.username}", "${hashedPassword}", 0)`, (error, result) => {
            if(error){
                // Send error if username is taken
                if(error.code == "ER_DUP_ENTRY") {
                    res.status(409).send("Username is already taken")
                // Send error msg if something else is wrong
                } else {
                    res.send(error.message)
                }
            } else {
                const returnJson = { "message":"Created", "userID":result.insertId };
                res.status(201).send(returnJson);
                console.log(returnJson);
            }

        })
    } else {
        res.status(400).send("Failed to register. Check inputs.")
    }
}