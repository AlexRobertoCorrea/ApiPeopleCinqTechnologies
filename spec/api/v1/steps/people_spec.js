/**
 * Created by alex on 26/04/16.
 */
var request = require('supertest');
var expect = require('chai').expect;

var global = require('../../../helpers/global-v1');

var personTest = global['personTest'];

module.exports = function(app) {

	describe('Create, list, put and delete a person', function () {

		this.timeout(50000000);

		var person;

		it('[teste]\t POST /api/v1/people', function (done) {

			request(app)
				.post('/api/v1/people')
				.send(personTest)
				.expect('Content-Type', /json/)
				.expect(200)
				.end(function (err, res) {
					if (err) {
						console.log(JSON.stringify(err, null, 3));
						done(err);
					}
					else {
						var json = res.body;
                        // console.log(JSON.stringify(json, null, 3));

						expect(json).to.be.a('object');
						expect(json.id).to.be.a('number');
						expect(json.name).to.be.a('string');
						expect(json.disclosableInfo).to.be.a('string');

						expect(json.name).to.equal(personTest.name);
						expect(json.disclosableInfo).to.equal(personTest.disclosableInfo);
						expect(json.id).to.equal(0);

                        person = json;

						done();
					}
				});
		});

		it('[teste]\t GET /api/v1/people', function (done) {

			request(app)
				.get('/api/v1/people')
				.expect('Content-Type', /json/)
				.expect(200)
				.end(function (err, res) {
					if (err) {
						console.log(JSON.stringify(err, null, 3));
						done(err);
					}
					else {
						var json = res.body;
//                        console.log(JSON.stringify(json, null, 3));

						expect(json).to.be.a('array');
						expect(json[0].id).to.be.a('number');
						expect(json[0].name).to.be.a('string');
						expect(json[0].disclosableInfo).to.be.a('string');

						expect(json[0].name).to.equal(personTest.name);
						expect(json[0].disclosableInfo).to.equal(personTest.disclosableInfo);
                        expect(json[0].id).to.equal(0);

						done();
					}
				});
		});

		it('[teste]\t GET /api/v1/people/:id', function (done) {

			request(app)
				.get('/api/v1/people/'+person.id)
				.expect('Content-Type', /json/)
				.expect(200)
				.end(function (err, res) {
					if (err) {
						console.log(JSON.stringify(err, null, 3));
						done(err);
					}
					else {
						var json = res.body;
//                        console.log(JSON.stringify(json, null, 3));

                        expect(json).to.be.a('object');
                        expect(json.id).to.be.a('number');
                        expect(json.name).to.be.a('string');
                        expect(json.disclosableInfo).to.be.a('string');

                        expect(json.name).to.equal(personTest.name);
                        expect(json.disclosableInfo).to.equal(personTest.disclosableInfo);
                        expect(json.id).to.equal(0);

						done();
					}
				});
		});

		it('[teste]\t PUT /api/v1/people/:id', function (done) {

            personTest.name = 'Rose M\'bebe';

			request(app)
				.put('/api/v1/people/'+person.id)
				.send({
					name: 'Rose M\'bebe'
				})
				.expect('Content-Type', /json/)
				.expect(200)
				.end(function (err, res) {
					if (err) {
						console.log(JSON.stringify(err, null, 3));
						done(err);
					}
					else {
						var json = res.body;
//                        console.log(JSON.stringify(json, null, 3));

                        expect(json).to.be.a('object');
                        expect(json.id).to.be.a('number');
                        expect(json.name).to.be.a('string');
                        expect(json.disclosableInfo).to.be.a('string');

                        expect(json.name).to.equal(personTest.name);
                        expect(json.disclosableInfo).to.equal(personTest.disclosableInfo);
                        expect(json.id).to.equal(0);

						done();
					}
				});
		});

		it('[teste]\t DELETE /api/v1/people/:id', function (done) {

			request(app)
				.delete('/api/v1/people/'+person.id)
				.expect(204)
				.end(function (err, res) {
					if (err) {
						console.log(JSON.stringify(err, null, 3));
						done(err);
					}
					else {
						done();
					}
				});
		});
	})
};
