const mongoose= require('mongoose')

const messageSchema= new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
    },
    chat:{
        type:String,
        required:true
    },
    
},{timestamps:true})


const messageModel= mongoose.model('message',messageSchema)
module.exports= messageModel