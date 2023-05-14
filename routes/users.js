const express = require('express')
const router = express.Router()
const { signup,login  } = require('../controllers/authController')
const UsersDatas = require('../controllers/UsersControllers')
const auth = require('../middlewares/auth')

router.post('/signup',signup)
router.post('/login',login)

router.get('/getAllUsers',UsersDatas.getAllUsers)
router.patch('/update/:id',UsersDatas.updateProfile)

module.exports = router