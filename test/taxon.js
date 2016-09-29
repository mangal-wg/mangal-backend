var fs = require('fs');
var db = require('../models');
var should = require('should');
var request = require('supertest');

// Set app test
var server = require('../')

beforeEach(function(done) {
    db.sequelize.sync({
        force: true
    }).then(function() {
        done();
    });
});

describe("Adding a taxon", function() {

    it("should work if the taxon is unique", function(done){

      var file = './test/data/taxon/vulpes_vulpes.json'
      var data = JSON.parse(fs.readFileSync(file, 'utf8'));
      
        request('http://localhost:3000')
            .post('/api/v0/taxon')
            .send(data)
            .end(function(err, res) {
              if (err) return done(err);
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
