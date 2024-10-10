const mongoose = require('mongoose')
require('dotenv').config();

const  mongoURL= process.env.online_mongoURL


mongoose.connect(mongoURL);

const db=mongoose.connection;

db.on('connected',()=>{
    console.log("db connected")
})

db.on('disconnected',()=>{
    console.log("db disconnected")
})

db.on('error',()=>{
    console.log("db error")
})

module.exports =db;