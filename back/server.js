const express = require('express');
const { dbConnect } = require('./helpers/dbConnection');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const app = express();

dbConnect();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());

//defining routes
app.use('/ubereats', authRoutes);
//defining port
const port = process.env.PORT || 8000;
app.listen(port,()=> console.log(`Server running on port ${port}`));