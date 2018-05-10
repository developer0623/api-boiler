
var request = require('supertest');
var agent = require('../server');

var expect = require('chai').expect;
var route = "/api";
var token = "";
var testData = {
	language: 'new-language'
}

var updatedTestData = {
	language: 'updated-language'
}

var existingLanguage = "";

describe('Testing Languages', function() {

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

	describe('Testing to get Language list: GET /languages', function() {

		beforeEach(function() {

		});


		it('Testing that we cannot get Language list without login: should return a 401 without token', function(done) {
			request(agent)
				.get(route + '/languages')
				.set('Accept', 'application/json')
				.expect(401)
				.end(done);
		});

		it('Testing that we can get Language list after login: should return a 200 with valid token', function(done) {
			request(agent)
				.get(route + '/languages')
				.set('Accept', 'application/json')
				.send({token: token})
				.expect(200)
				.end(function(err, res) {
					if (err) {
						return done(err);
					}

					expect(res.body).to.be.an('array');
					expect(res.body[0]).to.have.property('language').to.be.a('String');
					existingLanguage = res.body[0].language;

					done();
				});
		});
	});

	describe('Testing to create Language: POST /languages', function() {

		beforeEach(function() {

		});


		it('Testing that we cannot create language without login: should return a 401 without token', function(done) {
			request(agent)
				.post(route + '/languages')
				.set('Accept', 'application/json')
				.expect(401)
				.end(done);
		});

		it('Testing that we cannot create tenants with the same language: should return a 403 with already existing language', function(done) {
			request(agent)
				.post(route + '/languages')
				.set('Accept', 'application/json')
				.send({token: token, language: existingLanguage})
				.expect(403)
				.end(done);
		});

		it('Testing that we cannot create tenants with valid language: should return a 200 with valid token', function(done) {
			request(agent)
				.post(route + '/languages')
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

	describe('Testing to update Language: PATCH /languages', function() {

		beforeEach(function() {

		});


		it('Testing that we cannot update language without login: should return a 401 without token', function(done) {
			request(agent)
				.patch(route + '/languages/' + testData._id)
				.set('Accept', 'application/json')
				.expect(401)
				.end(done);
		});

		it('Testing that we cannot update language with same language: should return a 403 with existing language', function(done) {
			request(agent)
				.patch(route + '/languages/' + testData._id)
				.set('Accept', 'application/json')
				.send({token: token, language: existingLanguage})
				.expect(403)
				.end(done);
		});

		it('Testing that we can update language after login: should return a 200 with valid token', function(done) {
			request(agent)
				.patch(route + '/languages/' + testData._id)
				.set('Accept', 'application/json')
				.send(updatedTestData)
				.expect(200)
				.end(done);
		});
	});

	describe('Testing to delete Language: DELETE /languages', function() {

		beforeEach(function() {

		});


		it('Testing that we cannot delete Language without login: should return a 401 without token', function(done) {
			request(agent)
				.delete(route + '/languages/' + testData._id)
				.set('Accept', 'application/json')
				.expect(401)
				.end(done);
		});

		it('Testing that we can delete Language after login: should return a 200 with valid token', function(done) {
			request(agent)
				.delete(route + '/languages/' + testData._id)
				.set('Accept', 'application/json')
				.send({token: token})
				.expect(200)
				.end(done);
		});
	});

});
