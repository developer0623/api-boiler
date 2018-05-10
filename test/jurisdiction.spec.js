
var request = require('supertest');
var agent = require('../server');

var expect = require('chai').expect;
var route = "/api";
var token = "";
var testData = {
	jurisdiction: 'new-jurisdiction'
}

var updatedTestData = {
	jurisdiction: 'updated-jurisdiction'
}

var existingJurisdiction = "";

describe('Testing Jurisdictions', function() {

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

	describe('Testing to get Jurisdiction list: GET /jurisdictions', function() {

		beforeEach(function() {

		});


		it('Testing that we cannot get Jurisdiction list without login: should return a 401 without token', function(done) {
			request(agent)
				.get(route + '/jurisdictions')
				.set('Accept', 'application/json')
				.expect(401)
				.end(done);
		});

		it('Testing that we can get Jurisdiction list after login: should return a 200 with valid token', function(done) {
			request(agent)
				.get(route + '/jurisdictions')
				.set('Accept', 'application/json')
				.send({token: token})
				.expect(200)
				.end(function(err, res) {
					if (err) {
						return done(err);
					}

					expect(res.body).to.be.an('array');
					expect(res.body[0]).to.have.property('jurisdiction').to.be.a('String');
					existingJurisdiction = res.body[0].jurisdiction;

					done();
				});
		});
	});

	describe('Testing to create Jurisdiction: POST /jurisdictions', function() {

		beforeEach(function() {

		});


		it('Testing that we cannot create jurisdiction without login: should return a 401 without token', function(done) {
			request(agent)
				.post(route + '/jurisdictions')
				.set('Accept', 'application/json')
				.expect(401)
				.end(done);
		});

		it('Testing that we cannot create tenants with the same jurisdiction: should return a 403 with already existing jurisdiction', function(done) {
			request(agent)
				.post(route + '/jurisdictions')
				.set('Accept', 'application/json')
				.send({token: token, jurisdiction: existingJurisdiction})
				.expect(403)
				.end(done);
		});

		it('Testing that we cannot create tenants with valid jurisdiction: should return a 200 with valid token', function(done) {
			request(agent)
				.post(route + '/jurisdictions')
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

	describe('Testing to update Jurisdiction: PATCH /jurisdictions', function() {

		beforeEach(function() {

		});


		it('Testing that we cannot update jurisdiction without login: should return a 401 without token', function(done) {
			request(agent)
				.patch(route + '/jurisdictions/' + testData._id)
				.set('Accept', 'application/json')
				.expect(401)
				.end(done);
		});

		it('Testing that we cannot update jurisdiction with same jurisdiction: should return a 403 with existing jurisdiction', function(done) {
			request(agent)
				.patch(route + '/jurisdictions/' + testData._id)
				.set('Accept', 'application/json')
				.send({token: token, jurisdiction: existingJurisdiction})
				.expect(403)
				.end(done);
		});

		it('Testing that we can update jurisdiction after login: should return a 200 with valid token', function(done) {
			request(agent)
				.patch(route + '/jurisdictions/' + testData._id)
				.set('Accept', 'application/json')
				.send(updatedTestData)
				.expect(200)
				.end(done);
		});
	});

	describe('Testing to delete Jurisdiction: DELETE /jurisdictions', function() {

		beforeEach(function() {

		});


		it('Testing that we cannot delete Jurisdiction without login: should return a 401 without token', function(done) {
			request(agent)
				.delete(route + '/jurisdictions/' + testData._id)
				.set('Accept', 'application/json')
				.expect(401)
				.end(done);
		});

		it('Testing that we can delete Jurisdiction after login: should return a 200 with valid token', function(done) {
			request(agent)
				.delete(route + '/jurisdictions/' + testData._id)
				.set('Accept', 'application/json')
				.send({token: token})
				.expect(200)
				.end(done);
		});
	});

});
