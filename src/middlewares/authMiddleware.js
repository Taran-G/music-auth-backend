const jwt = require('jsonwebtoken')
const authUser = async(req,res) =>{

    const token = req.cookie.token;
    if(!token){
        return res.status(400).json({message:"Unautharised"})
    }
    try{
    const decode = jwt.verify(token,process.env.JWT_SECRET)
    if(decode.role !== "user"){
        return res.status(403).json({message:"Forbiden"})
    }
    req.user = decode;
    next();
    }
    catch(err){
        return res.status(400).json({message:"Unautharised"})
    }
}
module.exports = authUser