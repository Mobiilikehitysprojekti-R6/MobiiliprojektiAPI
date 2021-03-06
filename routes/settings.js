const express = require('express')
const settingsController = require('../controllers/settingsController')
const router = express.Router()

router.put("/editpassword", settingsController.editPassword)
router.put("/edittheme", settingsController.editThemecolor)
router.put("/editpremiumstatus/", settingsController.editPremiumStatus)
router.put("/editnotificationstatus/", settingsController.editNotificationStatus)
router.get("/:idUser", settingsController.getSettings)
router.post("/:idUser", settingsController.postSettings)
router.put("/editSleepInformation", settingsController.editSleepInformation)

module.exports = router;