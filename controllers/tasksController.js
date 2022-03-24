const db = require('../database');

exports.getTasks = (req, res) => {
    db.query(`SELECT * FROM Tasks WHERE Users_idUser=${req.params.idUser}`, (error, result) => {
        if(error){
            console.log(error.message)
            return res.status(500).send("error")
        } 
        return res.json(result)
    })
}

exports.addTask = (req, res) => {
    if(!req.body || Object.keys(req.body).length === 0) return res.status(400).send("request body is empty or missing")
    db.query(`INSERT INTO Tasks VALUES(${req.body.idUser}, null, "${req.body.header}",
            "${req.body.date}", ${req.body.time}, ${req.body.duration}, "${req.body.genre}",
                ${req.body.priority}, "${req.body.repeat}")`, (error, result ) => {
                    
        if(error){
            console.log(error.message)
            return res.status(500).send("error")
        } 
        console.log(result)
        return res.send("added")
    })
}

exports.removeTask = (req, res) => {
    if(!req.body || Object.keys(req.body).length === 0) return res.status(400).send("request body is empty or missing")
    db.query(`DELETE FROM Tasks WHERE idTask=${req.body.idTask}`, (error, result) => {
        if(error){
            console.log(error.message)
            return res.status(500).send("error")
        }
        if(result.affectedRows > 0) return res.send("deleted")
        return res.send("not found")
    })
}

exports.editTask = (req, res) => {

}