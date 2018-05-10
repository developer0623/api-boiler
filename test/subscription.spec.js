
var request = require('supertest');
var agent = require('../server');

var expect = require('chai').expect;
var route = "/api";
var token = "";

describe('Testing Subscription', function() {

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

					done();


				});
		});
	});

	describe('Testing to get whether Article is subscribed or not: GET /subscriptions/{articleId}', function() {

		beforeEach(function() {

		});


		it('Testing that we cannot call this API without token: should return a 401', function(done) {
			request(agent)
				.get(route + '/subscriptions/ArticleId')
				.set('Accept', 'application/json')
				.expect(401)
				.end(done);
		});

		it('Testing that we cannot call this API after login: should return a 200', function(done) {
			request(agent)
				.get(route + '/subscriptions/Articleid')
				.set('Accept', 'application/json')
				.send({token: token})
				.expect(200)
				.end(function(err, res) {
					if (err) {
						return done(err);
					}

					expect(res.body).to.have.property('result').to.be.a('Boolean');

					done();
				});
		});
	});

	describe('Testing to subscribe Article: PATCH /subscriptions', function() {

		beforeEach(function() {

		});


		it('Testing that we cannot subscribe Article without token: should return a 401', function(done) {
			request(agent)
				.patch(route + '/subscriptions')
				.set('Accept', 'application/json')
				.expect(401)
				.end(done);
		});

		it('Testing that we can subscribe Article with valid token: should return a 200', function(done) {
			request(agent)
				.patch(route + '/subscriptions')
				.set('Accept', 'application/json')
				.send({articleId: 'articleId', subscription: true})
				.expect(200)
				.end(done());
		});
	});
});
