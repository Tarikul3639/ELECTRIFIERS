const express = require('express');
const cors = require('cors');
const Router = require('./routes/Routes.js');
require('dotenv').config();

const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST'],
    credentials: true
}));

app.use(express.json()); 

// Routes
app.use('/api', Router);
app.use("/", (req, res) => {
    res.send({
        activeStatus: true,
        message: "Server is running",
        version: process.env.VERSION || "1.0.0",
        Error: false,
    })
});

module.exports = app;