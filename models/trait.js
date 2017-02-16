"use strict";

module.exports = function(sequelize, DataTypes) {
    var trait = sequelize.define('trait', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "Name of the trait collected"
        },
        localisation: {
          type: DataTypes.GEOMETRY('POINT'),
          comment: "Where the trait has been measured",
          unique: "uq_trait_const"
        },
        date:{
          type: DataTypes.DATEONLY,
          comment: "When the trait has been measured",
          unique: "uq_trait_const"
        },
        attr_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "Unique Identifier to retrieve the name of the attribute/trait measured",
            unique: "uq_trait_const"
        },
        value: {
            type: DataTypes.FLOAT,
            allowNull: false,
            comment: "Value of the trait/attribute"
        },
        description: {
            type: DataTypes.TEXT,
            comment: "Description of the trait and his measurement"
        },

    }, {
        underscored: true
    });

    return trait
};
