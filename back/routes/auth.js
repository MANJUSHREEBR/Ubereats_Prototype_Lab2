const express = require('express');
const router = express.Router();

const { signup } = require('../controller/auth'); 
const { signupValidator } = require('../helpers/validator');
router.post("/customer/signup", signupValidator, signup);

module.exports = router;