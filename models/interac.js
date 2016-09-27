"use strict";

module.exports = function(sequelize, DataTypes) {
    var interaction = sequelize.define('interaction', {
        item_id_from: {
            type: DataTypes.INTEGER,
            comment: "Unique identifier of the observation (FROM)",
            unique: "uq_interac_const",
            allowNull: false
        },
        item_id_to: {
            type: DataTypes.INTEGER,
            comment: "Unique identifier of the observation (TO)",
            unique: "uq_interac_const",
            allowNull: false
        },
        network_id: {
            type: DataTypes.INTEGER,
            comment: "Unique identifier of the proprietary network",
            unique: "uq_interac_const",
            allowNull: false
        },
        date_interac: {
            type: DataTypes.DATE,
            comment: "Date of the recorded interaction",
            unique: "uq_interac_const",
            allowNull: false
        },
        unidirectional: {
            type: DataTypes.BOOLEAN,
            comment: "Is this interaction unidirectional?",
            defaultValue: true
        },
        link_type: {
            type: DataTypes.STRING(25),
            comment: "Interaction type"
                // Add reference table
        },
        stage_f: {
            type: DataTypes.STRING(25),
            comment: "Developmental stage of the FROM species",
            allowNull: false
        },
        stage_t: {
            type: DataTypes.STRING(25),
            comment: "Developmental stage of the TO species",
            allowNull: false
        },
        sex_f: {
            type: DataTypes.ENUM,
            values: ['M', 'F'],
            comment: "Sex of the FROM species",
            allowNull: false
        },
        sex_t: {
            type: DataTypes.ENUM,
            values: ['M', 'F'],
            comment: "Sex of the TO species",
            allowNull: false
        },
        attr: {
            type: DataTypes.INTEGER,
            unique: "uq_interac_const",
            comment: "Unique Identifier to retrieve the name of the variable measured (if present)"
                // Add reference table
        },
        value: {
            type: DataTypes.FLOAT,
            comment: "Value of the attribute"
        },
        description: {
            type: DataTypes.TEXT('long'),
            comment: "Description of the interaction"
        },
        explicit_loc: {
            type: DataTypes.GEOMETRY('POINT'),
            comment: "Explicit localisation of the interaction"
        },
        public: {
            type: DataTypes.BOOLEAN,
            comment: "Is this available publicly? "
        }
    }, {
        classMethods: {
            associate: function(models) {
                  interaction.hasOne(models.network, {
                        onDelete: 'cascade',
                        foreignKey: 'network_id'
                    }),
                    interaction.hasOne(models.user, {
                        onDelete: 'cascade'
                    }),
                    interaction.hasMany(models.item, {
                        onDelete: 'cascade',
                        foreignKey: 'item_id_to'
                    }),
                    interaction.hasMany(models.item, {
                        onDelete: 'cascade',
                        foreignKey: 'item_id_from'
                    })
            },
            validate: {
                bothAttrValue: function() {
                    if ((this.value === null) && (this.attr !== null)) {
                        throw new Error('Attribute set with no value')
                    } else if (((this.value !== null) && (this.attr === null))) {
                        throw new Error('Value set with no attribute')
                    }
                }
            }
        }
    })
    return interaction
};
