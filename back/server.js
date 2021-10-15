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
const userRoutes = require('./routes/user');
const app = express();

dbConnect();
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());

//defining routes
app.use('/ubereats', authRoutes);
app.use('/ubereats', userRoutes);
//defining port
const port = process.env.PORT || 8000;
app.listen(port,()=> console.log(`Server running on port ${port}`));