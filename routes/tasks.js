const express = require('express')
const router = express.Router()
const taskController = require('../controllers/tasksController')

router.get("/:idUser", taskController.getTasks)
router.post("/add", taskController.addTask)
router.put("/modify", taskController.modifyTask)
router.delete("/remove", taskController.removeTask)

module.exports = router
