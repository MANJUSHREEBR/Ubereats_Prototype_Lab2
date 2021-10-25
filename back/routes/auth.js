const express = require('express');

const router = express.Router();

const {
  signup, signin, restSignup, restSignin,
} = require('../controller/auth');
const { signupValidator } = require('../Utils/validator');

router.post('/customer/signup', signupValidator, signup);
router.post('/customer/signin', signin);
router.post('/restaurant/signup', signupValidator, restSignup);
router.post('/restaurant/signin', restSignin);

module.exports = router;
