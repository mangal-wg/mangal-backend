"use strict";

module.exports = function(sequelize, DataTypes) {
    var interaction = sequelize.define('interaction', {
        taxon_1: {
            type: DataTypes.INTEGER,
            comment: "Unique identifier of the first taxon",
            unique: "uq_interac_const",
            allowNull: false
        },
        taxon_2: {
            type: DataTypes.INTEGER,
            comment: "Unique identifier of the second taxon",
            unique: "uq_interac_const",
            allowNull: false
        },
        taxon_1_level: {
            type: DataTypes.ENUM,
            values: ["taxon", "population", "individual"],
            defaultValue: "taxon",
            allowNull: false
        },
        taxon_2_level: {
            type: DataTypes.ENUM,
            values: ["taxon", "population", "individual"],
            defaultValue: "taxon",
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            comment: "Date of the recorded interaction",
            unique: "uq_interac_const",
            allowNull: true
        },
        direction: {
            type: DataTypes.ENUM,
            comment: "Direction of the interaction",
            values: [
                "directed",
                "undirected",
                "unknown"
            ],
            defaultValue: "directed",
            allowNull: false
        },
        type: {
            type: DataTypes.STRING(25),
            comment: "Interaction type"
                // Add reference table
        },
        method: {
            type: DataTypes.STRING(25),
            comment: "Method: observation, biblio, ..."
                // Add reference table
        },
        taxon_1_stage: {
            type: DataTypes.STRING(25),
            comment: "Developmental stage of the FROM species",
            allowNull: false
        },
        taxon_2_stage: {
            type: DataTypes.STRING(25),
            comment: "Developmental stage of the TO species",
            allowNull: false
        },
        taxon_1_sex: {
            type: DataTypes.ENUM,
            values: ['M', 'F'],
            comment: "Sex of the FROM species",
            allowNull: false
        },
        taxon_2_sex: {
            type: DataTypes.ENUM,
            values: ['M', 'F'],
            comment: "Sex of the TO species",
            allowNull: false
        },
        attr_id: {
            type: DataTypes.INTEGER,
            unique: "uq_interac_const",
            comment: "Unique Identifier to retrieve the name of the variable measured (if present)"
        },
        value: {
            type: DataTypes.FLOAT,
            comment: "Value of the attribute"
        },
        description: {
            type: DataTypes.TEXT,
            comment: "Description of the interaction"
        },
        coordinates: {
            type: DataTypes.GEOMETRY('POINT'),
            comment: "Explicit localisation of the interaction"
        },
        public: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull:false,
            comment: "Is this available publicly? "
        }
    }, {
        underscored: true,
        classMethods: {
            validate: {
                bothAttrValue: function() {
                    if ((this.value === null) && (this.attr_id !== null)) {
                        throw new Error('Attribute set with no value')
                    } else if (((this.value !== null) && (this.attr_id === null))) {
                        throw new Error('Value set with no attribute')
                    }
                }
            }
        }
    })
    return interaction
};
