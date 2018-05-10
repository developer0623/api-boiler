
var request = require('supertest');
var agent = require('../server');

var expect = require('chai').expect;
var route = "/api";
var token = "";
var testData = {
	tag: 'new-tag'
}

var updatedTestData = {
	tag: 'updated-tag'
}

var existingTag = "";

describe('Testing Tags', function() {

	describe('Testing to login with tenant: POST /tenants/login', function() {

		beforeEach(function() {

		});

		it('Testing to get valid token after login: should return a 200 with valid credentials', function(done) {
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

	describe('Testing to get Tag list: GET /tags', function() {

		beforeEach(function() {

		});


		it('Testing that we cannot get Tag list without login: should return a 401 without token', function(done) {
			request(agent)
				.get(route + '/tags')
				.set('Accept', 'application/json')
				.expect(401)
				.end(done);
		});

		it('Testing that we can get Tag list after login: should return a 200 with valid token', function(done) {
			request(agent)
				.get(route + '/tags')
				.set('Accept', 'application/json')
				.send({token: token})
				.expect(200)
				.end(function(err, res) {
					if (err) {
						return done(err);
					}

					expect(res.body).to.be.an('array');
					expect(res.body[0]).to.have.property('tag').to.be.a('String');
					existingTag = res.body[0].tag;

					done();
				});
		});
	});

	describe('Testing to create Tag: POST /tags', function() {

		beforeEach(function() {

		});


		it('Testing that we cannot create tag without login: should return a 401 without token', function(done) {
			request(agent)
				.post(route + '/tags')
				.set('Accept', 'application/json')
				.expect(401)
				.end(done);
		});

		it('Testing that we cannot create tenants with the same tag: should return a 403 with already existing tag', function(done) {
			request(agent)
				.post(route + '/tags')
				.set('Accept', 'application/json')
				.send({token: token, tag: existingTag})
				.expect(403)
				.end(done);
		});

		it('Testing that we cannot create tenants with valid tag: should return a 200 with valid token', function(done) {
			request(agent)
				.post(route + '/tags')
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
	});

	describe('Testing to update Tag: PATCH /tags', function() {

		beforeEach(function() {

		});


		it('Testing that we cannot update tag without login: should return a 401 without token', function(done) {
			request(agent)
				.patch(route + '/tags/' + testData._id)
				.set('Accept', 'application/json')
				.expect(401)
				.end(done);
		});

		it('Testing that we cannot update tag with same tag: should return a 403 with existing tag', function(done) {
			request(agent)
				.patch(route + '/tags/' + testData._id)
				.set('Accept', 'application/json')
				.send({token: token, tag: existingTag})
				.expect(403)
				.end(done);
		});

		it('Testing that we can update tag after login: should return a 200 with valid token', function(done) {
			request(agent)
				.patch(route + '/tags/' + testData._id)
				.set('Accept', 'application/json')
				.send(updatedTestData)
				.expect(200)
				.end(done);
		});
	});

	describe('Testing to delete Tag: DELETE /tags', function() {

		beforeEach(function() {

		});


		it('Testing that we cannot delete Tag without login: should return a 401 without token', function(done) {
			request(agent)
				.delete(route + '/tags/' + testData._id)
				.set('Accept', 'application/json')
				.expect(401)
				.end(done);
		});

		it('Testing that we can delete Tag after login: should return a 200 with valid token', function(done) {
			request(agent)
				.delete(route + '/tags/' + testData._id)
				.set('Accept', 'application/json')
				.send({token: token})
				.expect(200)
				.end(done);
		});
	});

});
