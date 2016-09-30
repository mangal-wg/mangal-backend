var fs = require('fs');
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

        var endpoint = '/api/v0/taxon'

        request(addr)
            .post(endpoint)
            .send(data[0])
            .end(function() {
                request(addr)
                    .post(endpoint)
                    .send(data[1])
                    .expect(400,done)
            })
    });

    it("should not work if the taxon has no name", function(done) {
        var data = {
            "vernacular": "Moose",
            "tsn": 180604
        };

        request(addr)
            .post('/api/v0/taxon')
            .send(data)
            .expect(400, done)
    });

});

describe("GETting a taxon", function() {

    it("should return 200 status and empty json/body if ID doesn't exist", function(done) {

        request(addr)
            .get('/api/v0/taxon?tsn=0000')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                 res.body.length.should.equal(0);
                 done();
            })

    });
    it("should return a taxon with the correct ID if it exists", function(done){
           
           var data = {
               "name": "Echiura",
               "bold": 27333
        };
           
           request(addr)
              .post('/api/v0/taxon')
              .send(data)
              .expect(201)
              .end(function(){
                     request(addr)
                            .get('/api/v0/taxon?name=Echiura')
                            .expect('Content-Type', /json/)
                            .expect(200)
                            .end(function(err, res){
                                   res.body.length.should.equal(1);
                                   res.body[0].bold.should.be.equal(data.bold);
                                   done();
                            })
              });
    });

})