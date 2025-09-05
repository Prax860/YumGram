const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const foodRoutes = require('./routes/food.routes');
const app  = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get('/', (req, res) => {
    res.send('Connected successfully');
});
app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);
module.exports = app;