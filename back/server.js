const express = require('express');
const { dbConnect } = require('./helpers/dbConnection');
require('dotenv').config();
const app = express();

dbConnect();

//defining port
const port = process.env.PORT || 8000;
app.listen(port,()=> console.log(`Server running on port ${port}`));