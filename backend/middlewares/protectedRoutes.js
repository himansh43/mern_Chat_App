const jwt= require('jsonwebtoken')
const userModel= require('../models/userSchema')


const protectedRoute= async(req,res,next)=>{
try {
    // const token= req.headers.authorization
   const token=  req.headers.authorization.split('Bearer ')[1]
    if (!token) {
        return res.status(401).json({ error: "Unauthorized - No Token Provided" });
    }

    const decodedValue= jwt.verify(token,process.env.JWT_SECRET)
    if (!decodedValue) {
        return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    }

    const user= await userModel.findById(decodedValue.userId).select('-password')
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    req.user= user
    next()
} catch (error) {
    res.status(500).json({message:"Internal server Error", status:false, error:error})
}
}

module.exports= protectedRoute