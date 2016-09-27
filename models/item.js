"use strict";

module.exports = function(sequelize, DataTypes) {
    var item = sequelize.define('item', {
        level: {
            type: DataTypes.ENUM,
            values: ['taxon', 'ind', 'pop'],
            allowNull: false,
            defaultValue: 'taxon'
        },
        taxon_id: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            comment: "Name of the item"
        },
        size: {
            type: DataTypes.FLOAT,
            comment: "Population size. ONLY ALLOWED when level is set as `pop`."
                // Add reference table
        },
        units: {
            type: DataTypes.STRING,
            comment: "Units in which the population size was measured."
        },
        description: {
            type: DataTypes.TEXT,
            comment: "Description of the item"
        },
        public: {
            type: DataTypes.BOOLEAN,
            comment: "Is this available publicly? "
        }
    }, {
        underscored: true,
        classMethods: {
            associate: function(models) {
                item.hasMany(models.interaction, {
                        onDelete: 'cascade',
                        foreignKey: 'item_id_to'
                    }),
                    item.hasMany(models.interaction, {
                        onDelete: 'cascade',
                        foreignKey: 'item_id_from'
                    })

            },
        }
    })

    return item

};
