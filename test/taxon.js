var fs = require('fs');
var db = require('../models');
var should = require('should');
var request = require('supertest');

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

describe("POSTing a taxon", function() {

    it("should work if the taxon is not unique", function(done) {

        var data = [{
            "name": "Vulpes vulpes",
            "vernacular": "Red fox",
            "tsn": 180604
        }, {
            "name": "Alces alces",
            "vernacular": "Moose",
            "tsn": 180604
        }];

        request(addr)
            .post('/api/v0/taxon')
            .send(data[0], data[1])
            .expect(400,done)
    });

    it("should not work if the taxon has no name", function(done) {
        var data = {
            "vernacular": "Moose",
            "tsn": 180604
        };

        request(addr)
            .post('/api/v0/taxon')
            .send(data)
            .expect(400,done)
    });

});

describe("GETting a taxon", function() {

    it("should return 404 if there is no taxon with this ID",function(done){

      request(addr)
          .get('/api/v0/taxon?tsn=0000')
          
    });
    it("should return a taxon with the correct ID if it exists");

})
