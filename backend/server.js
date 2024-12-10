const express= require('express')
require('dotenv').config()
const PORT= process.env.PORT
const {app,server}= require('./socket/socket')
const cors= require('cors')
const bodyParser= require('body-parser')
const cookieParser= require('cookie-parser')
app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())



const mongoose= require('mongoose')
const mongoDB_URL= process.env.MONGODB_URL
mongoose.connect(mongoDB_URL).then(()=>{console.log('MongoDb connected')}).catch((error)=>{console.log(error)})
const authRoutes= require('./routes/authRoutes')
const messageRoutes= require('./routes/messageRoutes')
const userRoutes= require('./routes/userRoutes')

app.use('/api/auth',authRoutes)
app.use('/api/messages',messageRoutes)
app.use('/api/users',userRoutes)


server.listen(PORT,()=>{console.log(`server started at PORT: ${PORT}`)})
