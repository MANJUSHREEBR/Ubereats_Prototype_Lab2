const express = require('express');
const { dbConnect } = require('./Utils/dbConnection');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
var session = require('express-session');
var cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const app = express();
//use express session to maintain session data
app.use(session({
    secret: 'cmpe273_kafka_passport_mongo',
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
}));
dbConnect();
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());

//defining routes
app.use('/ubereats', authRoutes);
//defining port
const port = process.env.PORT || 8000;
app.listen(port,()=> console.log(`Server running on port ${port}`));