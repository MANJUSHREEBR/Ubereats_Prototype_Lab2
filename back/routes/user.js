const express = require('express');

const router = express.Router();
const { isAuth, isRestaurantAuth, isRestaurant} = require('../controller/auth');
const { checkAuth } = require('../Utils/passport');

const { customerById } = require('../controller/user');

router.param('customerId', customerById);

module.exports = router;
