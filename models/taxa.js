"use strict";

module.exports = function(sequelize, DataTypes) {
    var taxa = sequelize.define('taxa', {
        taxa_name_rec: {
            type: DataTypes.TEXT('medium'),
            comment: "Name of the recorded taxa set by the original owner"
        },
        vernacular: {
            type: DataTypes.TEXT('medium'),
            comment: "Vernacular name of the species",
            unique: 'uq_vernacular'
        },
        description: {
            type: DataTypes.TEXT('long'),
            comment: "Description of the taxa"
        },
        ncbi: {
            type: DataTypes.INTEGER,
            comment: "Unique Identifier from the National Center for Biotechnology Information",
            unique: 'uq_ncbi'
        },
        tsn: {
            type: DataTypes.INTEGER,
            comment: "Unique identifier from the Integrated Taxonomic Information System",
            unique: 'uq_stn'
        },
        gbif: {
            type: DataTypes.INTEGER,
            comment: "Unique identifier from the Global Biodiversity Information Facility",
            unique: 'uq_gbif'
        },
        eol: {
            type: DataTypes.INTEGER,
            comment: "Unique identifier from the Encyclopedia of Life",
            unique: 'uq_eol'
        },
        status: {
            type: DataTypes.ENUM,
            values: ['pending', 'confirmed', 'unresolved'],
            comment: "Status of the taxonomic validation"
        },
        public: {
            type: DataTypes.BOOLEAN,
            comment: "Is this available publicly? "
        }
    }, {
        classMethods: {
            associate: function(models) {
                taxa.hasOne(models.user, {
                    onDelete: 'SET NULL'
                })
            }
        }
    });

    return taxa

};
