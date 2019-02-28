"use strict";

module.exports = function(sequelize, DataTypes) {
    var interaction = sequelize.define('interaction', {
        node_from: {
            type: DataTypes.INTEGER,
            comment: "Unique identifier of the first taxon",
            unique: "uq_interac_const",
            allowNull: false
        },
        node_to: {
            type: DataTypes.INTEGER,
            comment: "Unique identifier of the second taxon",
            unique: "uq_interac_const",
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            comment: "Date of the recorded interaction",
            unique: "uq_interac_const",
            allowNull: true
            //What should be the defaultValue? How to write a period?
        },
        direction: {
            type: DataTypes.ENUM,
            comment: "Direction of the interaction",
            values: [
                "directed",
                "undirected",
                "unknown"
            ],
            defaultValue: "unknown",
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM,
            comment: "Interaction type",
            values: [
                "competition",
                "amensalism",
                "neutralism",
                "commensalism",
                "mutualism",
                "parasitism",
                "predation",
                "herbivory",
                "symbiosis",
                "scavenger",
                "unknown"
            ],
            defaultValue: "unknown",
            allowNull: false
        },
        method: {
            type: DataTypes.STRING(35),
            comment: "Method: observation, biblio, experimental"
            // TODO Add reference table
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
        localisation: {
            type: DataTypes.GEOMETRY,
            comment: "Explicit localisation of the interaction"
        },
        public: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull:false,
            comment: "Is this available publicly? "
        },
        network_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {        
        classMethods: {
            associate: function(models) {
                interaction.hasMany(models.environment, {
                    onDelete: 'cascade'
                })
            }
        },
        underscored: true,
        freezeTableName: true,
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
