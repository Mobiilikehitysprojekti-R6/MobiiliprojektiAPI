const express = require('express')
const router = express.Router()
const taskController = require('../controllers/tasksController')

router.get("/:idUser", taskController.getTasks)
router.post("/", taskController.addTask)
router.put("/", taskController.editTask)
router.delete("/", taskController.removeTask)

module.exports = router;
