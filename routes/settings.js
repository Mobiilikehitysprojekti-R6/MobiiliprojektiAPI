const express = require('express')
const settingsController = require('../controllers/settingsController')
const router = express.Router()

router.put("/editpassword", settingsController.editPassword)
router.put("/edittheme/:idUser", settingsController.editThemecolor)
router.put("/editpremiumstatus/:idUser", settingsController.editPremiumStatus)
router.put("/editnotificationstatus/:idUser", settingsController.editNotificationStatus)
router.get("/:idUser", settingsController.getSettings)
router.post("/:idUser", settingsController.postSettings)
router.put("/editSleepInformation", settingsController.editSleepInformation)

module.exports = router;