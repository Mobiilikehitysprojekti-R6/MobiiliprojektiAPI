const db = require('../database');

exports.getTasks = (req, res) => {
    db.query(`SELECT * from Tasks WHERE Users_idUser=${req.params.idUser}`, (error, result) => {
        if(error) return res.status(500).send({msg: "error"})
        return res.json(result)
    })
}

exports.addTask = (req, res) => {
    
}

exports.removeTask = (req, res) => {

}

exports.modifyTask = (req, res) => {

}