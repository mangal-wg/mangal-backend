"use strict";

module.exports = function(sequelize, DataTypes) {
    var instance = sequelize.define('instance', {
        level: {
            type: DataTypes.ENUM,
            values: ['taxon', 'individual', 'population'],
            allowNull: false,
            defaultValue: 'taxon'
        },
        taxon_id: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            comment: "Name of the instance"
        },
        size: {
            type: DataTypes.FLOAT,
            comment: "Population size. ONLY ALLOWED when level is set as `population`."
                // Add reference table
        },
        units: {
            type: DataTypes.STRING,
            comment: "Units in which the population size was measured."
        },
        description: {
            type: DataTypes.TEXT,
            comment: "Description of the instance"
        },
        public: {
            type: DataTypes.BOOLEAN,
            comment: "Is this available publicly? "
        }
    }, {
        underscored: true,
        classMethods: {
            associate: function(models) {
                instance.hasMany(models.interaction, {
                        onDelete: 'cascade',
                        foreignKey: 'instance_id_to'
                    }),
                    instance.hasMany(models.interaction, {
                        onDelete: 'cascade',
                        foreignKey: 'instance_id_from'
                    })

            },
        }
    })

    return instance

};
