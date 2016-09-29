"use strict";

module.exports = function(sequelize, DataTypes) {
    var taxon = sequelize.define('taxon', {
        name: {
            type: DataTypes.STRING,
            comment: "Name of the recorded taxon",
            allowNull: false
        },
        vernacular: {
            type: DataTypes.STRING,
            comment: "Vernacular name of the taxon",
            unique: 'uq_vernacular'
        },
        description: {
            type: DataTypes.TEXT,
            comment: "Description of the taxon"
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
        eol: {
            type: DataTypes.INTEGER,
            comment: "Unique identifier from the Encyclopedia of Life",
            unique: 'uq_eol'
        },
        bold: {
            type: DataTypes.INTEGER,
            comment: "Unique identifier from the Barcode of Life Database",
            unique: 'uq_bold'
        },
        status: {
            type: DataTypes.ENUM,
            values: [
                "confirmed",
                "trophic species",
                "morphospecies",
                "nomen dubium",
                "nomen oblitum",
                "nomen nudum",
                "nomen novum",
                "nomen conservandum",
                "species inquirenda"
            ],
            comment: "Status of the taxonomic validation",
            defaultValue: "confirmed",
            allowNull: false
        }
    }, {
        underscored: true,
        classMethods: {
            associate: function(models) {
                taxon.hasMany(models.interaction, {
                        onDelete: 'cascade',
                        foreignKey: 'taxon_1'
                    }),
                taxon.hasMany(models.interaction, {
                        onDelete: 'cascade',
                        foreignKey: 'taxon_2'
                    })
            },
        }
    });

    return taxon

};
