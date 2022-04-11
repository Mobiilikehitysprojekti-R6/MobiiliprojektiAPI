const db = require('../database');
const bcrypt = require('bcrypt');

exports.editPassword = (req, res) => {

    if(!req.body || Object.keys(req.body).length === 0) res.status(400).send("request body is empty or missing")

    const salt = bcrypt.genSaltSync(5);
    const hashedPassword = bcrypt.hashSync(req.body.newPassword, salt);

    let getQuery = `SELECT * FROM Users WHERE idUser = ${req.body.idUser}`;
    let updateQuery = `UPDATE Users SET Password = '${hashedPassword}' WHERE idUser = ${req.body.idUser}`;

    db.query(getQuery, (err, result) => {
        if(err) {
            console.log(err.message)
            res.status(500).send("error")
        } else {

            (async () => {
                const result1 = await bcrypt.compare(req.body.password, result[0].Password);
            
                if (result1) {

                    console.log("Passwords matched, creating new password...");
                    db.query(updateQuery, (err, result) => {
                        if(err) {
                            console.log(err.message)
                            res.status(500).send("error")
                        } else {
                            console.log("New password changed");
                            res.status(200).send("New password changed");
                        }
                    })
                } else {
                    console.log("Passwords didn't match!");
                    res.status(500).send("Passwords didn't match!");
                }
            }) ();
        }
    })
}
//tämä haetaan luultavasti kirjautumisen kanssa
exports.getSettings = (req, res) => {
    db.query(`SELECT EnableNotifications, ThemeColor FROM Settings WHERE Users_idUser=${req.params.idUser}`, (error, result) => {
        if(error){
            console.log(error.message)
            return res.status(500).send("error")
        } 
        return res.json(result)
    })
}

exports.editThemecolor = (req, res) => {
    db.query(`UPDATE Settings SET ThemeColor = '${req.body.newColor}' WHERE Users_idUser = ${req.params.idUser}`, (error, result) => {
        if(error){
            console.log(error.message)
            res.status(500).send("error")
        } else {
            console.log("New ThemeColor set");
            res.status(200).send("New ThemeColor set");
        }
    })
}