
var request = require('supertest');
var agent = require('../server');

var expect = require('chai').expect;
var route = "/api";
var token = "";
var testData = {
	title: 'article1',
	description: 'content content',
	image: '',
	type: 'TYPE',
	start_date: new Date(2012, 1, 1),
	expiry_date: new Date(2014, 1, 1),
	tags: ["tag1", "tag2"]
}

var updatedTestData = {
	title: 'article2',
	description: 'content2 content2',
	image: '',
	type: 'TYPE',
	start_date: new Date(2012, 3, 3),
	expiry_date: new Date(2014, 3, 3),
	tags: ["tag3", "tag4"]
}

var testFilter = {
	status: 'read', 
	reference: 'investorid', 
	tags: 'tag1,tag2'
};

var firstArticle = {};

describe('Testing Articles', function() {

	/*describe('Testing to login with tenant: POST /tenants/login', function() {

		beforeEach(function() {

		});

		it('Testing to get token after login', function(done) {
			request(agent)
				.post(route + '/tenants/login')
				.set('Accept', 'application/json')
				.send({login: 'erik', password: 'erik'})
				.expect(200)
				.end(function(err, res) {
					if (err) {
						return done(err);
					}

					token = res.body.token;
					testData.token = token;
					updatedTestData.token = token;

					done();


				});
		});
	});

	describe('Testing to get Article List: GET /articles', function() {

		beforeEach(function() {

		});


		it('Testing that we cannot get Article List without login: should return a 401 without token', function(done) {
			request(agent)
				.get(route + '/articles')
				.set('Accept', 'application/json')
				.expect(401)
				.end(done);
		});

		it('Testing that we can get Article after login: should return a 200 with valid token', function(done) {
			request(agent)
				.get(route + '/articles')
				.set('Accept', 'application/json')
				.send({token: token})
				.expect(200)
				.end(function(err, res) {
					if (err) {
						return done(err);
					}

					firstArticle = res.body[0];

					expect(res.body).to.be.an('array');
					expect(res.body[0]).to.have.property('title').to.be.a('String');
					expect(res.body[0]).to.have.property('description').to.be.a('String');
					expect(res.body[0]).to.have.property('type').to.be.a('String');
					expect(res.body[0]).to.have.property('tags').to.be.a('array');

					done();
				});
		});
	});

	describe('Testing to create new Article: POST /articles', function() {

		beforeEach(function() {

		});


		it('Testing that we cannot create article without login: should return a 401 without token', function(done) {
			request(agent)
				.post(route + '/articles')
				.set('Accept', 'application/json')
				.expect(401)
				.end(done);
		});		

		it('Testing that we can create Article after login: should return a 200 with valid token', function(done) {
			request(agent)
				.post(route + '/articles')
				.set('Accept', 'application/json')
				.send(testData)
				.expect(200)
				.end(function(err, res) {
					if (err) {
						return done(err);
					}

					testData._id = res.body._id;

					done();
				});
		});

		it('Testing that we cannot create Article if start date is after expiry date: should return a 403', function(done) {
			testData.start_date = new Date(2015, 1, 1);
			testData.expiry_date = new Date(2012, 1, 1);
			request(agent)
				.post(route + '/articles')
				.set('Accept', 'application/json')
				.send(testData)
				.expect(403)
				.end(done);
		});
	});

	describe('Testing to get Article by Id: GET /articles/{id}/{access_key}', function() {

		beforeEach(function() {

		});

		it('Testing that we cannot get Article with invalid ArticleId: should return a 404 with invalid ArticleId', function(done) {
			request(agent)
				.get(route + '/articles/57a8a0e2fa1a98e321abb15c/' + firstArticle.access_key)
				.set('Accept', 'application/json')
				.expect(404)
				.end(done);
		});

		it('Testing that we cannot get Article with invalid Access Key: should return a 403 with invalid access key', function(done) {
			request(agent)
				.get(route + '/articles/' + firstArticle._id + '/wrong-access-key')
				.set('Accept', 'application/json')
				.expect(403)
				.end(done);
		});

		it('Testing that we can get Article: should return a 200 with valid ArticleId and Access Key', function(done) {
			request(agent)
				.get(route + '/articles/' + firstArticle._id + '/' + firstArticle.access_key)
				.set('Accept', 'application/json')
				.expect(200)
				.end(done);
		});
	});

	describe('Testing to update Article: PATCH /articles', function() {

		beforeEach(function() {

		});


		it('Testing that we cannot update Article without login: should return a 401 without token', function(done) {
			request(agent)
				.patch(route + '/articles/' + testData._id)
				.set('Accept', 'application/json')
				.expect(401)
				.end(done);
		});

		it('Testing that we can update Article after login: should return a 200 with valid token', function(done) {
			request(agent)
				.patch(route + '/articles/' + testData._id)
				.set('Accept', 'application/json')
				.send(updatedTestData)
				.expect(200)
				.end(done);
		});

		it('Testing that we cannot update Article if start date is after expiry date: should return a 403', function(done) {
			updatedTestData.start_date = new Date(2015, 1, 1);
			updatedTestData.expiry_date = new Date(2012, 1, 1);
			request(agent)
				.patch(route + '/articles/' + testData._id)
				.set('Accept', 'application/json')
				.send(updatedTestData)
				.expect(403)
				.end(done);
		});
	});

	describe('Testing to delete Article: DELETE /articles', function() {

		beforeEach(function() {

		});


		it('Testing that we cannot delete Article without login: should return a 401 without token', function(done) {
			request(agent)
				.delete(route + '/articles/' + testData._id)
				.set('Accept', 'application/json')
				.expect(401)
				.end(done);
		});

		it('Testing that we cannot delete Article after login: should return a 200 with valid token', function(done) {
			request(agent)
				.delete(route + '/articles/' + testData._id)
				.set('Accept', 'application/json')
				.send({token: token})
				.expect(200)
				.end(done);
		});
	});*/

	describe('Testing to get Article Id list: GET /articles/{access_key}', function() {

		beforeEach(function() {

		});

		it('Testing that we can get Article Id list: should return a 200', function(done) {
			request(agent)
				.get(route + '/articles/3iY8oIt3xUbJpUJydUHQgLsBYT6Wby0T')
				.set('Accept', 'application/json')
				.send(testFilter)
				.expect(200)
				.end(function(err, res) {
					if (err) {
						return done(err);
					}

					console.log(JSON.stringify(res.body))
					expect(res.body).to.be.an('array');

					done();
				});
		});
	});

});
