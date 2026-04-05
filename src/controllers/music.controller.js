const { decode } = require('jsonwebtoken');
const musicModel = require('../models/musicModel')
const jwt = require('jsonwebtoken')
const uploadFile = require('../service/storage.service')

const CreateAlbum = async (req,res)=>{

    const {title,musics,artist} = req.body;
     const token = req.cookie.token;
    if(!token){
        return res.satus(400).json({message:"Unautharised"})
    }
    try{
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    
    if(decoded.role !== "artist"){
             return res.satus(403).json({message:"Forbiden"})


    }
}
catch(err){
                return res.status(400).json({message:"Unautharised"})

    }}

    const listenSongs = async (req,res)=>{

        const data = await musicModel.find().limit(10).populate("artist" ,"username email")
        res.status(200).json({
            message:"Songs fetched successfully",
            songs:data
        })

    }

    

 const createMusic = async (req,res)=>{

    const {uri,title,artist} = req.body;
    const token = req.cookie.token;
    if(!token){
        return res.satus(400).json({message:"Unautharised"})
    }
    try{
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    
    if(decoded.role !== "artist"){
             return res.satus(403).json({message:"Forbiden"})


    }
    const file = req.file;
    const result = await uploadFile(file.buffer.toString('base64'))

    const music = await musicModel.create(
        {
            uri:result.url,
            title:title,
            artist:decoded.id

        }
        
    )
    res.status(200).json({
        message:"Music Created Successfully",
        music:{
        id:_id,
        title:music.title,
        url:music.uri,
        artist:music.artist

    }})
    }
    catch(err){
                return res.satus(400).json({message:"Unautharised"})

    }

     

}
module.exports = {createMusic,listenSongs};