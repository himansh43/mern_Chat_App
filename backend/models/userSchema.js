const mongoose= require('mongoose')
const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    gender:{
        type:String,
        required:true,
        enum:["male","female"]
    },
    password:{
        type:String,
        required:true,
    },
    confirmPassword:{
        type:String,
        required:true
    },
    profileImage:{
        type:String,
        default:""
    }
},{timestamps:true})

const userModel= mongoose.model('user',userSchema)

module.exports=userModel