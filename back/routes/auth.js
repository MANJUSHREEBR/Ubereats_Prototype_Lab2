const express = require('express');
const router = express.Router();

const { signup, signin } = require('../controller/auth'); 
const { signupValidator } = require('../Utils/validator');

router.post("/customer/signup", signupValidator, signup);
router.post("/customer/signin", signin);

module.exports = router;