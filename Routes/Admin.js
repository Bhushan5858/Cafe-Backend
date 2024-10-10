const express = require('express');
const router = express.Router();
const UserColl = require('./../Models/UserColl');
const ReservationColl=require('./../Models/ReservationColl')
const MenuColl =require('./../Models/MenuColl');
const multer = require('multer');




//we don't need to create the sign In rroute for Admin because it is allredy
//created in User Routes ,ok

//All Reservation
router.get('/AdminReservation', async (req,res)=>{
   
    try{
        const Reservations= await ReservationColl.find({status:"pending"});
        res.status(200).json({Reservations})
        
    }catch (err) {
        console.log(err);
        res.status(500).json({ err: "server error in backend", err });
    }

})

//Done Reservation
router.put('/AdminDoneRes', async (req, res) => {
    try {
        const data= req.body; // Get the updated data from the request body
        const ID = data.Id;

        // Find the reservation by ID and update it
        const updatedReservation = await ReservationColl.deleteOne({_id:ID});


        // Send back the updated reservation
        res.status(200).json({ ok:"Done"});
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: "server error in backend", err });
    }
});



//for Add MENU     

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory to save uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Use the original file name
    },
});


const upload = multer({ storage });


//menu insert route
router.post('/MenuAdd', upload.single('image'), async (req, res) => {
    try {
        const { category, name, price } = req.body; // Get fields from the body
        const image = req.file ? req.file.filename : null; // Get the filename from multer

        const newItem = new MenuColl({
            category,
            name,
            price,
            image,
        });

        const response = await newItem.save();
        res.status(200).json({ ok: 'item inserted', response });
    } catch (err) {
        console.error("Error adding item:", err); // Log the error for debugging
        res.status(500).json({ err: "server error in backend", err });
    }
});



//menu search item route
// Route: GET /Admin/Menusearch?name=ItemName
// Route: POST /Admin/Menusearch
router.post('/Menusearch', async (req, res) => {
    try {
        const data = req.body;
        const name = data.name;
        const item = await MenuColl.findOne({ name: name });
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json({ item });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: "Server error in backend", err });
    }
});




//menu update
router.put('/MenuUpdate', upload.single('image'), async (req, res) => {
    try {
        const oldname = req.body.oldname;
        const category = req.body.category;
        const newname = req.body.name;
        const price = req.body.price;
        const image = req.file ? req.file.filename : req.body.image; // Get the new image if uploaded, otherwise keep the old one
        console.log(image);
        // Find and update the item in the database
        const updateditem = await MenuColl.updateOne(
            { name: oldname },  // Find the item by its old name
            { 
                $set: {
                    category: category,
                    name: newname,
                    price: price,
                    image: image 
                }
            }
        );

        if (updateditem.nModified === 0) {
            return res.status(404).json({ message: 'Item not found or no changes made' });
        }

        // Send back the success response
        res.status(200).json({ message: "Item updated successfully", updateditem });
    } catch (err) {
        console.error('Error updating item:', err);
        res.status(500).json({ err: "Server error", error: err.message });
    }
});


// admin delete menu
router.delete('/MenuDelete', async (req, res) => {
    console.log(req.body);  // Add this to see what the backend is receiving
    try {
        const { name, category } = req.body; // Get the name and category from the request body

        if (!name || !category) {
            return res.status(400).json({ error: "Name and Category are required" });
        }

        // Find the item by its name and category and delete it
        const deleteditem = await MenuColl.deleteOne({ name: name, category: category });

        if (deleteditem.deletedCount === 0) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.status(200).json({ message: "Item deleted successfully" });
    } catch (err) {
        console.error('Error deleting item:', err);
        res.status(500).json({ error: "Server error", details: err });
    }
});




module.exports = router;