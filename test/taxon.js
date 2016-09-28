var assert = require('assert');

describe("Operations on taxa", function() {
    
    describe("Adding a taxon", function() {

        it("should work if the taxon is unique");
        it("should not work if the taxon is not unique");
        it("should not work if the taxon has no name");

    });

    describe("GETting a taxon", function() {

        it("should return 404 if there is no taxon with this ID");
        it("should return a taxon with the correct ID if it exists");

    })

});
