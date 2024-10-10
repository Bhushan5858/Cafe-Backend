const mongoose =require('mongoose');


const MenuSchema=new mongoose.Schema({

    category:{
        type:String,
        required:true,
    },

    name:{
        type:String,
        required:true,
    },

    price:{
        type:String,
        required:true,
    },

    image:{
        type:String,
        required:true
    },
});


const MenuColl=mongoose.model('MenuCollection',MenuSchema);

module.exports=MenuColl;