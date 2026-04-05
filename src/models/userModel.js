const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    username:{type:String,
        unique:true,
        required:true   
    },
    email:{type:String,
        unique:true,
        required:true   
    },
    role:{type:String,
        required:true,
        enum:["user","artist"],
        default:"user"
    },
    
    password:{type:String,
        required:true
    }
})
const user=mongoose.model('user',userSchema)

module.exports = user;