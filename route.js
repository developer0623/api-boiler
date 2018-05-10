
module.exports = function(app) {

	// ROUTES FOR OUR API
	// =============================================================================

	// middleware to use for all requests

	app.use(function(req, res, next) {
		// do logging
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
		res.header("Access-Control-Allow-Methods", "PUT, POST, GET, PATCH, DELETE");
		next();
	});

	app.use('/api/admin-users', require('./api/admin-users'));
	app.use('/api/tenants', require('./api/tenants'));
	app.use('/api/articles', require('./api/articles'));
	app.use('/api/tags', require('./api/tags'));
	app.use('/api/references', require('./api/references'));
	app.use('/api/subscriptions', require('./api/subscriptions'));
	app.use('/api/categories', require('./api/categories'));
	app.use('/api/languages', require('./api/languages'));
	app.use('/api/jurisdictions', require('./api/jurisdictions'));
	app.use('/api/payment', require('./api/payment'));

};