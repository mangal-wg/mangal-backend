"use strict"; 

module.exports = function(sequelize, DataTypes) {
    var taxonomy = sequelize.define('taxonomy', {
        name: {
            type: DataTypes.STRING,
            comment: "Scientific name of the recorded taxon",
            allowNull: false,
            unique: "uq_name"
        },
        ncbi: {
            type: DataTypes.INTEGER,
            comment: "Unique Identifier from the National Center for Biotechnology Information",
        },
        tsn: {
            type: DataTypes.INTEGER,
            comment: "Unique identifier from the Integrated Taxonomic Information System",
        },
        eol: {
            type: DataTypes.INTEGER,
            comment: "Unique identifier from the Encyclopedia of Life",
        },
        bold: {
            type: DataTypes.INTEGER,
            comment: "Unique identifier from the Barcode of Life Database",
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
        freezeTableName: true,
        classMethods: {
            associate: function(models) {
                taxonomy.hasMany(models.node, {
                        onDelete: 'cascade',
                        foreignKey: 'taxonomy_id'
                }),
                taxonomy.hasMany(models.trait, {
                    onDelete: 'cascade',
                    foreignKey: 'taxonomy_id'
                })
            },
        }
    });

    return taxonomy

};
