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

app.get('/', (req, res) => {
    res.json({ message: 'API is running...' });
  });

// Routes
app.use('/api', Router);

module.exports = app;