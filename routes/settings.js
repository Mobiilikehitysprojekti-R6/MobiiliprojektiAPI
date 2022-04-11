const express = require('express')
const settingsController = require('../controllers/settingsController')
const router = express.Router()

router.put("/editpassword", settingsController.editPassword)
router.put("/edittheme/:idUser", settingsController.editThemecolor)
router.get("/:idUser", settingsController.getSettings)


module.exports = router;