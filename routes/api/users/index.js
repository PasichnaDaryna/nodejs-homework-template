const express = require('express')
const router = express.Router()
// const validate = require('./validation')
const userController = require('../../../controllers/users')
const guard = require('../../../helpers/guard')
const upload = require('../../../helpers/upload')

router.post('/registration', userController.reg)
router.post('/login', userController.login)
router.post('/logout', guard, userController.logout)
router.patch('/avatars', upload.single('avatar'), () => { })


module.exports = router
