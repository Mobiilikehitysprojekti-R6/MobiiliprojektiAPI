const express = require('express')
const settingsController = require('../controllers/settingsController')
const router = express.Router()

router.put("/", settingsController.editPassword)

module.exports = router;