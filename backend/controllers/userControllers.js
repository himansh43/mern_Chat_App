const userModel= require('../models/userSchema')
const getUsers= async(req,res)=>{
    // let { search } = req.query;
    // console.log("backend search", search)
    try {
        // let searchCriteria = {};
        // if (search) {
        //     searchCriteria = {
        //         name: {
        //             $regex: search,
        //             $options: 'i' // case insensitive
        //         }
        //     }
        // }
        const id= req.user.id
        const users= await userModel.find({_id:{$ne:id}})
        //    const users= await userModel.find(search)

    
        res.status(200).json({users:users,message:"Succesfully fetched users", success:true})
    } catch (error) {
        res.status(500).json({message:"Internal server Error", success:false, error:error})
    }
}

module.exports= {getUsers}