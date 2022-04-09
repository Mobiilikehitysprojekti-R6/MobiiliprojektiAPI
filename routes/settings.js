const express = require('express')
const settingsController = require('../controllers/settingsController')
const router = express.Router()

router.put("/", settingsController.editPassword)
router.put("/:idUser", settingsController.editThemecolor)
router.get("/:idUser", settingsController.getSettings)


module.exports = router;