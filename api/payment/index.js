'use strict';

var express = require('express');
var controller = require('./payment.controller');

var router = express.Router();

router.post('/stripe', controller.doStripeCheckout);

module.exports = router;