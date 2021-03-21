const express = require('express')
const router = express.Router()
const validate = require('./validation')
const userController = require('../../../controllers/users')
const guard = require('../../../helpers/guard')
const upload = require('../../../helpers/upload')
const { validateUploadAvatar } = require('./validation')

router.post('/registration', userController.reg)
router.post('/login', userController.login)
router.post('/logout', guard, userController.logout)
router.patch('/avatars', [guard, upload.single('avatar')],
    userController.avatars,
)


module.exports = router
