const express = require('express');

const router = express.Router();
const { isAdmin } = require('../controller/auth');
const { requireAuth, checkAuth } = require('../Utils/passport');

const { customerById } = require('../controller/user');

router.param('customerId', customerById);

module.exports = router;
