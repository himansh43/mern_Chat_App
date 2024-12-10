const express= require('express')
const router= express.Router()
const {sendMessages,getMessages} = require('../controllers/messageControllers.js')
const protectedRoute = require('../middlewares/protectedRoutes')


router.post('/send/:id',protectedRoute,sendMessages)

router.get('/:id',protectedRoute,getMessages)
module.exports= router