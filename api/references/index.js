'use strict';

var express = require('express');
var controller = require('./reference.controller');

var router = express.Router();

router.patch('/:access_key', controller.updateReference);

module.exports = router;