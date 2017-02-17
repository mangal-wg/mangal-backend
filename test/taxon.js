var db = require('../models');
var request = require('supertest');
var expect = require('chai').expect;

// Set app test
var server = require('../')
var addr = 'localhost:3000'

beforeEach(function(done) {
    db.sequelize.sync({
        force: true
    }).then(function() {
        done();
    });
});

describe("Operation on ressources", function() {

    describe("POSTing a taxon", function() {

        it("should work if the taxon is not unique", function(done) {

            var data = [{
                "name": "Vulpes vulpes",
                "tsn": 180604
            }, {
                "name": "Alces alces",
                "tsn": 180604
            }];

            var endpoint = '/api/v0/taxons'

            request(addr)
                .post(endpoint)
                .send(data[0])
                .end(function() {
                    request(addr)
                        .post(endpoint)
                        .send(data[1])
                        .expect(400, done)
                })
        });

        it("should not work if the taxon has no name", function(done) {
            var data = {
                "vernacular": "Moose",
                "tsn": 180604
            };

            request(addr)
                .post('/api/v0/taxons')
                .send(data)
                .expect(400, done)
        });

    });

    describe("GETting a taxon", function() {

        // TODO Add a test to get /api/v0/taxon/{id} where {id} is the mangal id 
        // of a previously added taxon.
        it("should work when calling /api/v0/taxon/id"), function(done) {};

        it("should return 200 status and empty json/body if ID doesn't exist", function(done) {

            request(addr)
                .get('/api/v0/taxons?tsn=0000')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    expect(res.body).to.have.length(0);
                    done();
                })

        });
        
        it("should return a taxon with the correct ID if it exists", function(done) {

            var data = {
                "name": "Echiura",
                "bold": 27333
            };

            request(addr)
                .post('/api/v0/taxons')
                .send(data)
                .expect(201)
                .end(function() {
                    request(addr)
                        .get('/api/v0/taxons?name=Echiura')
                        .expect('Content-Type', /json/)
                        .expect(200)
                        .end(function(err, res) {
                            expect(res.body).to.have.length(1);
                            expect(res.body[0].bold).to.equal(data.bold);
                            done();
                        })
                });
        });

    })
})
