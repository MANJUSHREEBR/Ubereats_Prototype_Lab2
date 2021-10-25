/* eslint-disable no-console */
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const { colors } = require('colors');
const session = require('express-session');
const cors = require('cors');
const { dbConnect } = require('./Utils/dbConnection');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const restaurantRoutes = require('./routes/restaurant');
const dishesRoutes = require('./routes/dishes');

const app = express();

dbConnect();
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());

// defining routes
app.use('/ubereats', authRoutes);
app.use('/ubereats', userRoutes);
app.use('/ubereats', restaurantRoutes);
app.use('/ubereats', dishesRoutes);
// defining port
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running on port ${port}`.yellow));
