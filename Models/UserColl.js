const mongoose =require('mongoose');


const UserSchema=new mongoose.Schema({

    username:{
        type:String,
        required:true,
        trim:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    phone:{
        type:String,
        required:true,
        trim:true
    },

    password:{
        type:String,
        required:true,
        trim:true
    },

    role:{
        type:String,
        default:'User',
        enum:['User','Admin'],
        required:true,
    }
});


const UserColl=mongoose.model('UserCollection',UserSchema);

module.exports=UserColl;