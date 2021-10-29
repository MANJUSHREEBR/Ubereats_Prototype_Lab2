const express = require('express');

const router = express.Router();
const { isAuth, isRestaurantAuth, isRestaurant} = require('../controller/auth');
const { checkAuth } = require('../Utils/passport');

const { customerById, updateUser } = require('../controller/user');

router.param('customerId', customerById);
router.put('/customer/:customerId', updateUser);

module.exports = router;
