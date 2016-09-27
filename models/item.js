"use strict";

module.exports = function(sequelize, DataTypes) {
    var item = sequelize.define('item', {
        level: {
            type: DataTypes.ENUM,
            values: ['taxon', 'ind', 'pop'],
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            comment: "Name of the item"
        },
        size: {
            type: DataTypes.INTEGER,
            comment: "Number of individus in the population. ONLY ALLOWED when level is set as pop"
                // Add reference table
        },
        description: {
            type: DataTypes.TEXT('long'),
            comment: "Description of the item"
        },
        public: {
            type: DataTypes.BOOLEAN,
            comment: "Is this available publicly? "
        }
    }, {
        classMethods: {
            associate: function(models) {
                item.hasOne(models.taxon, {
                        onDelete: 'cascade'
                    }),
                item.hasOne(models.user, {
                        onDelete: 'cascade'
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

return item

};
