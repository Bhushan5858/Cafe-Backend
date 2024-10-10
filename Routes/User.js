const express = require('express');
const router = express.Router();
const UserColl = require('./../Models/UserColl');
const ReservationColl=require('./../Models/ReservationColl');
const { reset } = require('nodemon');
const { JWTmiddelware, createToken } = require('./../JWT');
const MenuColl = require('../Models/MenuColl');

// POST route for signing up a user
router.post('/SignUp', async (req, res) => {
    try {
        const data = req.body; // Make sure this has all required fields
        const newUser = new UserColl(data); // Corrected line
        const response = await newUser.save();
        res.status(200).json({ ok: 'ok' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: "server error in backend", err });
    }
});

router.post('/SignIn', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Checking if user exists or not
        const user = await UserColl.findOne({ email: email });

        // If user does not exist
        if (!user) {
            return res.status(401).json({ err: "User not found" }); // Use 'return' to stop further execution
        }

        // If user exists
        if (user.password === password) {

            //if email and pssword is correct then create the token
            const token = createToken(user);
            res.status(200).json({ok:"ok" ,token})
        } else {
            return res.status(401).json({ err: "Incorrect password" }); // Use 'return' to stop further execution
        }
        
    } catch (err) {
        console.log(err);
        return res.status(500).json({ err: "server error in backend", err }); // Use 'return' to stop further execution
    }
});

   //Profile route for User
  router.get('/Profile',JWTmiddelware,async(req,res)=>{
    try{
         //in this you need to import data from jwt toke 
         
            const data = req.userdata
         const user=await UserColl.findOne({email:data.userdata.email});
         res.status(200).json({user})


    }catch (err) {
        console.log(err);
        return res.status(500).json({ err: "server error in backend", err }); // Use 'return' to stop further execution
    }
})


//Reservation route for user
router.post('/UserReservation', async (req, res) => {
    try {
        const data = req.body; // Make sure this has all required fields
        console.log(data)
        const newReservation = new ReservationColl(data); // Corrected line
        const response = await newReservation.save();
        res.status(200).json({ ok: 'table is booked' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: "server error in backend", err });
    }
});

router.get('/UserReservation', JWTmiddelware,async (req,res)=>{
    //in this we need to import email from jwt toke
    //example we have
    try{

        const data = req.userdata
        const Reservations= await ReservationColl.find({email:data.userdata.email,status:"pending"});
        res.status(200).json({Reservations})
        
    }catch (err) {
        console.log(err);
        res.status(500).json({ err: "server error in backend", err });
    }

})

router.get('/ShowMenu', async(req,res)=>{
    try{

        const menulist = await MenuColl.find();
        res.status(200).json({menulist})

    }catch (err) {
        console.log(err);
        res.status(500).json({ err: "server error in backend", err });
    }
})

module.exports = router;
