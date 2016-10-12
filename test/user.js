var db = require('../models');
var request = require('supertest');
var should = require('should')

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

describe("Operation with users and login", function() {

    describe("POSTing resources", function() {

        it("should return 401 if the user is not authentified", function(done) {
            request(addr)
                .get('/api/v0/taxon')
                .expect(401, done)
        });
    });

    describe("GETting resources", function() {

        it("should return 401 if the user is not authentified", function(done) {
            var data = {
                "vernacular": "Moose",
                "tsn": 180604
            };

            request(addr)
                .post('/api/v0/taxon')
                .send(data)
                .expect(401, done)
        });
    });

});
