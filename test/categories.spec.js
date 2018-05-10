
var request = require('supertest');
var agent = require('../server');

var expect = require('chai').expect;
var route = "/api";
var token = "";
var testData = {
	category: 'new-category'
}

var updatedTestData = {
	category: 'updated-category'
}

var existingCategory = "";

describe('Testing Categories', function() {

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

	describe('Testing to get Category list: GET /categories', function() {

		beforeEach(function() {

		});


		it('Testing that we cannot get Category list without login: should return a 401 without token', function(done) {
			request(agent)
				.get(route + '/categories')
				.set('Accept', 'application/json')
				.expect(401)
				.end(done);
		});

		it('Testing that we can get Category list after login: should return a 200 with valid token', function(done) {
			request(agent)
				.get(route + '/categories')
				.set('Accept', 'application/json')
				.send({token: token})
				.expect(200)
				.end(function(err, res) {
					if (err) {
						return done(err);
					}

					expect(res.body).to.be.an('array');
					expect(res.body[0]).to.have.property('category').to.be.a('String');
					existingCategory = res.body[0].category;

					done();
				});
		});
	});

	describe('Testing to create Category: POST /categories', function() {

		beforeEach(function() {

		});


		it('Testing that we cannot create category without login: should return a 401 without token', function(done) {
			request(agent)
				.post(route + '/categories')
				.set('Accept', 'application/json')
				.expect(401)
				.end(done);
		});

		it('Testing that we cannot create tenants with the same category: should return a 403 with already existing category', function(done) {
			request(agent)
				.post(route + '/categories')
				.set('Accept', 'application/json')
				.send({token: token, category: existingCategory})
				.expect(403)
				.end(done);
		});

		it('Testing that we cannot create tenants with valid category: should return a 200 with valid token', function(done) {
			request(agent)
				.post(route + '/categories')
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

	describe('Testing to update Category: PATCH /categories', function() {

		beforeEach(function() {

		});


		it('Testing that we cannot update category without login: should return a 401 without token', function(done) {
			request(agent)
				.patch(route + '/categories/' + testData._id)
				.set('Accept', 'application/json')
				.expect(401)
				.end(done);
		});

		it('Testing that we cannot update category with same category: should return a 403 with existing category', function(done) {
			request(agent)
				.patch(route + '/categories/' + testData._id)
				.set('Accept', 'application/json')
				.send({token: token, category: existingCategory})
				.expect(403)
				.end(done);
		});

		it('Testing that we can update category after login: should return a 200 with valid token', function(done) {
			request(agent)
				.patch(route + '/categories/' + testData._id)
				.set('Accept', 'application/json')
				.send(updatedTestData)
				.expect(200)
				.end(done);
		});
	});

	describe('Testing to delete Category: DELETE /categories', function() {

		beforeEach(function() {

		});


		it('Testing that we cannot delete Category without login: should return a 401 without token', function(done) {
			request(agent)
				.delete(route + '/categories/' + testData._id)
				.set('Accept', 'application/json')
				.expect(401)
				.end(done);
		});

		it('Testing that we can delete Category after login: should return a 200 with valid token', function(done) {
			request(agent)
				.delete(route + '/categories/' + testData._id)
				.set('Accept', 'application/json')
				.send({token: token})
				.expect(200)
				.end(done);
		});
	});

});
