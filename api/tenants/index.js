'use strict';

var express = require('express');
var controller = require('./tenant.controller');
var config = require('../../config');
var jwt    = require('jsonwebtoken');

var router = express.Router();

function checkAuth(req, res, next) {
	var token = req.body.token || req.query.token || req.headers['Authorization'];

	// decode token
	if (token) {

		// verifies secret and checks exp
		jwt.verify(token, config.secret, function(err, decoded) {
			if (err) {
				return res.status(401).send({message: 'Authentication Failed'});
			} else {
			// if everything is good, save to request for use in other routes
				req.user = decoded;
				next();
			}
		});

	} else {
		return res.status(401).send({message: 'Authentication Failed'});
	}
}

router.get('/', checkAuth, controller.getTenants);
router.get('/accesskey', checkAuth, controller.getAccessKey);
router.post('/', checkAuth, controller.newTenant);
router.patch('/:login', checkAuth, controller.updateTenant);
router.delete('/:login', checkAuth, controller.deleteTenant);
router.post('/:login/change-password', checkAuth, controller.changePassword);
router.post('/login', controller.login);

module.exports = router;