const express= require('express')
const router= express.Router()
const {getUsers}= require('../controllers/userControllers')
const protectedRoute = require('../middlewares/protectedRoutes')

router.get('/',protectedRoute,getUsers)


module.exports= router