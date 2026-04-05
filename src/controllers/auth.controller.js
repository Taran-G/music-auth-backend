const jsonwebtoken = require('jsonwebtoken');
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt')
const Register = async (req,res)=>{
 const {username,email,role="user",password } = req.body;

 const ifuserExist = await userModel.findOne({
    $or:[
        { username },
        { email }
    ]}
)
if(ifuserExist){
    res.status(409).json({
        message:"User already exist"
    })
}
const hash = await bcrypt.hash(password,10)
const user = await userModel.create({
    username,email,role,password:hash
})
const token = jsonwebtoken.sign({
    id:user._id,
    role:user.role
},process.env.JWT_SECRET)



res.cookie("token",token)
res.status(201).json({
    message: "user generated successfully",
    user:{
        id:user._id,
        username:user.username,
        email:user.email,
        role:user.role,
        password:user.password,
    }
})

}

const Login = async(req,res)=>{
     const {username,email,password } = req.body;

     const user = await userModel.findOne({
        $or:[{username},
            {email}]
     })
     if(!user){
        return res.json({
            message:"Invalid credentials username or password doent match"
        })
     }
     const ispasswordmatch = await bcrypt.compare(password,user.password);
     if(!ispasswordmatch){
        return res.json({
            message:"Invalid credentials password doesnt match"
        })
     }

     const token = jsonwebtoken.sign({
        id : user._id,
        role : user.role
     },process.env.JWT_SECRET)

     res.cookie("token",token)
     res.status(200).json({
        message:"Login successful",
        user:{

            id:user._id,    
            username:user.username,
            email:user.email,
            role:user.role,
        }     })


}


    const Logout = async(req,res)=>{
    res.clearCookie("token")
    res.status(200).json({
        message:"Logout successful"
    })      }
module.exports = {Register, Login,Logout};