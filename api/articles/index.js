'use strict';

var express = require('express');
var controller = require('./article.controller');
var config = require('../../config');
var jwt    = require('jsonwebtoken');

var router = express.Router();

function checkAuth(req, res, next) {
	var token = req.body.token || req.query.token;

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

router.get('/', checkAuth, controller.getArticles);
router.get('/:_id/:access_key', controller.getArticleById);
router.get('/:access_key', controller.getArticlesByFilter);
router.post('/', checkAuth, controller.newArticle);
router.patch('/:_id', checkAuth, controller.updateArticle);
router.delete('/:_id', checkAuth, controller.deleteArticle);

module.exports = router;