
var request = require('supertest');
var agent = require('../server');

var expect = require('chai').expect;
var route = "/api";
var testData = {
	reference: 'investorid',
	status: 'read'
}

describe('Testing References', function() {	

	describe('Testing to update status: PATCH /references/{access_key}', function() {

		beforeEach(function() {

		});

		it('Testing that we cannot update status with invalid articleId: should return a 403', function(done) {
			testData.articleId = "34a8a9e2fa1a98e321aeb15c";
			request(agent)
				.patch(route + '/references/AbCDel67Up3bTBzzm8JgUEfpQcWdsK0E')
				.set('Accept', 'application/json')
				.send(testData)
				.expect(403)
				.end(done);
		});

		it('Testing that we cannot update status with invalid access_key: should return a 403', function(done) {
			testData.articleId = "57e8a9e2fa1a98e321aeb15c";
			request(agent)
				.patch(route + '/references/wrongaccesskey')
				.set('Accept', 'application/json')
				.send(testData)
				.expect(403)
				.end(done);
		});

		it('Testing that we can update status with valid access_key and articleId: should return a 200', function(done) {			
			request(agent)
				.patch(route + '/references/AbCDel67Up3bTBzzm8JgUEfpQcWdsK0E')
				.set('Accept', 'application/json')
				.send(testData)
				.expect(200)
				.end(done);
		});
	});

});
