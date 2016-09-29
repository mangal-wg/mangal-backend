var fs = require('fs');
var db = require('../models');
var should = require('should');
var supertest = require('supertest');

// Set Test environment
process.env.NODE_ENV = 'test'
var app = require('../')
var server = supertest.agent("http://localhost:3000");

describe("Operations on taxa", function() {

    // beforeEach(function(){
    //   return db.sequelize.sync({
    //     force:true,
    //     logging: false
    //   });
    // });

    describe("Adding a taxon", function() {

        it("should work if the taxon is unique", function(done) {

            var file = './test/data/taxon/vulpes_vulpes.json'
            var data = JSON.parse(fs.readFileSync(file, 'utf8'));

            server
                .post('/api/v0/taxon')
                .send(data)
                .end(function(err, res) {
                    console.log(res);
                    if (err) {
                        throw err;
                    }
                    res.status.should.be.equal(201);
                    done();
                });
        });

        it("should not work if the taxon is not unique");
        it("should not work if the taxon has no name");

    });

    describe("GETting a taxon", function() {

        it("should return 404 if there is no taxon with this ID");
        it("should return a taxon with the correct ID if it exists");

    })

});
