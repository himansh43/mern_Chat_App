const express= require('express')
const router= express.Router()
const {signup,login,logOut}= require('../controllers/authControllers')
const {signupValidation,loginValidation} = require('../middlewares/authValidations')



router.post('/signup',signup)
router.post('/login',login)
router.post('/logout',logOut)

module.exports= router