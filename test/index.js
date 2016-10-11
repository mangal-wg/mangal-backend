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

require('./user')
require('./taxon')