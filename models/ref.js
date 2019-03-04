"use strict";

module.exports = function(sequelize, DataTypes) {
    var ref = sequelize.define('ref', {
        doi: {
            type: DataTypes.STRING,
            defaultValue: "NA",
            comment: "DOI of the attached publication"
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "firt author name"
        },
        year: {
            type: DataTypes.STRING,
            comment: "year of publication",
            defaultValue: "NA"
        },
        jstor: {
          type: DataTypes.STRING,
          defaultValue: "NA",
          comment: "JSTOR of the attached publication"
        },
        pmid: {
            type: DataTypes.STRING,
            defaultValue: "NA",
            comment: "PMID of the attached publication"
        },
        bibtex: {
            type: DataTypes.TEXT,
            defaultValue: "NA",
            comment: "BibTex of the attached publication"
        },
        paper_url: {
            type: DataTypes.TEXT,
            allowNull: true,
            isUrl: true,
            comment: "URL of the attached publication"
        },
        data_url: {
            type: DataTypes.TEXT,
            isUrl: true,
            allowNull: false,
            comment: "URL of the attached data"
        }
    }, {
        underscored: true,
        freezeTableName: true,
        classMethods: {
            associate: function(models) {
                ref.hasMany(models.dataset, {
                    onDelete: 'cascade'
                })
            }
        }
    });

    return ref
};
