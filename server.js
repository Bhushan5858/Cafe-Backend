const express = require('express');
const db = require('./db');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const PORT = process.env.PORT || 4000;
// Middleware
const app = express();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());
app.use(express.json()); // For parsing application/json

// Routes
app.get('/', (req, res) => {
  res.send('Hello, World!');
});


// User Routes
const UserRoutes = require('./Routes/User');
app.use('/User', UserRoutes); 

// Admin Routes
const AdminrRoutes = require('./Routes/Admin');
app.use('/Admin', AdminrRoutes);

// Start the server
app.listen( PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
