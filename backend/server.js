// const express= require ('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// require('dotenv').config();
// const path= require('path');
// const connectDB= require("./config/db");
// const authRoutes = require('./routes/authRoutes');
// const incomeRoutes = require('./routes/incomeRoutes');
// const expenseRoutes = require('./routes/expenseRoutes');
// const dashboardRoutes = require('./routes/dashboardRoutes');
 
// const app = express();

// app.get("/",(req,res)=>{
//     res.send("hello world!!")
// })
// //middleware to handle CORS and JSON data
// app.use(cors({
//     origin:  '*',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization']
// }));
// app.use(express.json());


// connectDB();


// app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/income", incomeRoutes);
// app.use("/api/v1/expense", expenseRoutes);
// app.use("/api/v1/dashboard", dashboardRoutes);

// //serve uploaded images statically
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');
const connectDB = require("./config/db");
const authRoutes = require('./routes/authRoutes');
const incomeRoutes = require('./routes/incomeRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();

app.get("/", (req, res) => {
    res.send("hello world!!")
})

//middleware to handle CORS and JSON data
app.use(cors({
    origin: process.env.CLIENT_URL || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// cache DB connection across serverless invocations
let isConnected = false;
app.use(async (req, res, next) => {
    if (!isConnected) {
        await connectDB();
        isConnected = true;
    }
    next();
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

//serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// only listen locally — Vercel handles this itself via the export below
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
