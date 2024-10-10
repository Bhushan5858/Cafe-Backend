const mongoose =require('mongoose');


const ReservationSchema=new mongoose.Schema({


    email:{
        type:String,
        required:true
    },

    phone:{
        type:String,
        required:true,
        trim:true
    },

    date:{
        type:String,
        required:true
    },

    time:{
        type:String,
        required:true
    },

    people:{
        type:String,
        required:true
    },
    
    status:{
        type:String,
        required:true,
        enum:['done','pending','cancel'],
        default:'pending'
    }
});


const ReservationColl=mongoose.model('ReservationCollection',ReservationSchema);

module.exports=ReservationColl;