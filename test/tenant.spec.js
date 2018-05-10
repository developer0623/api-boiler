
var request = require('supertest');
var agent = require('../server');

var expect = require('chai').expect;
var route = "/api";
var token = "";
var testData = {
	name: 'Test',
	login: 'Test123',
	password: 'Test123'
}

var updatedTestData = {
	name: 'Test Update'
}

describe('Testing Tenants', function() {

	describe('Testing to login: POST /tenants/login', function() {

		beforeEach(function() {

		});

		it('Testing that we cannot login without wrong credentials: should return a 404 with wrong credentials', function(done) {
			request(agent)
				.post(route + '/tenants/login')
				.set('Accept', 'application/json')
				.send({login: 'erik1', password: 'erik1'})
				.expect(404)
				.end(done);
		});		

		it('Testing that Tenant can login with correct credentials: should return a 200 with valid credentials', function(done) {
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

	describe('Testing to get Tenant List: GET /tenants', function() {

		beforeEach(function() {

		});


		it('Testing that we cannot get Tenants list without login: should return a 401 without token', function(done) {
			request(agent)
				.get(route + '/tenants')
				.set('Accept', 'application/json')
				.expect(401)
				.end(done);
		});

		it('Testing that we cannot get Tenants list after login: should return a 200 with valid token', function(done) {
			request(agent)
				.get(route + '/tenants')
				.set('Accept', 'application/json')
				.send({token: token})
				.expect(200)
				.end(function(err, res) {
					if (err) {
						return done(err);
					}

					expect(res.body).to.be.an('array');
					expect(res.body[0]).to.have.property('name').to.be.a('String');
					expect(res.body[0]).to.have.property('login').to.be.a('String');

					done();
				});
		});
	});

	describe('Testing to create new Tenant: POST /tenants', function() {

		beforeEach(function() {

		});


		it('Testing that we cannot create Tenant without Login: should return a 401 without token', function(done) {
			request(agent)
				.post(route + '/tenants')
				.set('Accept', 'application/json')
				.expect(401)
				.end(done);
		});

		it('Testing that we can create Tenant after Login: should return a 200 with valid token', function(done) {
			request(agent)
				.post(route + '/tenants')
				.set('Accept', 'application/json')
				.send(testData)
				.expect(200)
				.end(done);
		});
	});



	describe('Testing to get Access Key: GET /tenants/accesskey', function() {

		beforeEach(function() {

		});


		it('Testing that we cannot get Tenant Access Key without login: should return a 401 without token', function(done) {
			request(agent)
				.get(route + '/tenants/accesskey')
				.set('Accept', 'application/json')
				.expect(401)
				.end(done);
		});

		it('Testing that we can get Tenant Access Key after login: should return a 200 with valid token', function(done) {
			request(agent)
				.get(route + '/tenants/accesskey')
				.set('Accept', 'application/json')
				.send({token: token})
				.expect(200)
				.end(function(err, res) {
					if (err) {
						return done(err);
					}

					expect(res.body).to.have.property('access_key').to.be.a('String');

					done();
				});
		});
	});

	describe('Testing to update Tenant: PATCH /tenants', function() {

		beforeEach(function() {

		});


		it('Testing that we cannot update Tenant without Login: should return a 401 without token', function(done) {
			request(agent)
				.patch(route + '/tenants/' + testData.login)
				.set('Accept', 'application/json')
				.expect(401)
				.end(done);
		});

		it('Testing that we can update Tenant after Login: should return a 200 with valid token', function(done) {
			request(agent)
				.patch(route + '/tenants/' + testData.login)
				.set('Accept', 'application/json')
				.send(updatedTestData)
				.expect(200)
				.end(done);
		});
	});

	describe('Testing to change password: POST /tenants/{login}/change-password', function() {		

		beforeEach(function() {

		});


		it('Testing that Tenant cannot change password without Login: should return a 401 without token', function(done) {
			request(agent)
				.post(route + '/tenants/' + testData.login + '/change-password')
				.set('Accept', 'application/json')
				.expect(401)
				.end(done);
		});

		it('Testing that Tenant cannot change password with wrong old password: should return a 404 with wrong old password', function(done) {
			var wrongPassword = {
				newPassword: "test000",
				oldPassword: "test123",
				token: token
			};
			request(agent)
				.post(route + '/tenants/' + testData.login + '/change-password')
				.set('Accept', 'application/json')
				.send(wrongPassword)
				.expect(404)
				.end(done);
		});

		it('Testing that Tenant can change password with correct old password: should return a 200 with correct old password', function(done) {
			var correctPassword = {
				newPassword: "test000",
				oldPassword: testData.password,
				token: token
			}
			request(agent)
				.post(route + '/tenants/' + testData.login + '/change-password')
				.set('Accept', 'application/json')
				.send(correctPassword)
				.expect(200)
				.end(done);
		});
	});

	describe('Testing to delete Tenant: DELETE /tenants', function() {

		beforeEach(function() {

		});


		it('Testing that Tenant cannot delete Tenant without login: should return a 401 without token', function(done) {
			request(agent)
				.delete(route + '/tenants/' + testData.login)
				.set('Accept', 'application/json')
				.expect(401)
				.end(done);
		});

		it('Testing that Tenant can delete Tenant after login: should return a 200 with valid token', function(done) {
			request(agent)
				.delete(route + '/tenants/' + testData.login)
				.set('Accept', 'application/json')
				.send({token: token})
				.expect(200)
				.end(done);
		});
	});

});
