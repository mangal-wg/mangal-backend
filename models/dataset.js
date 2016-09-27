"use strict";

module.exports = function(sequelize, DataTypes) {
    var dataset = sequelize.define('dataset', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "Name of the collected dataset"
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            comment: "Collection date"
        },
        description: {
            type: DataTypes.TEXT('long'),
            comment: "Description of the dataset collected"
        },
        public: {
            type: DataTypes.BOOLEAN,
            comment: "Is this available publicly? "
        }

    }, {
        classMethods: {
            associate: function(models) {
                dataset.hasMany(models.network, {
                    onDelete: 'cascade'
                }),
                dataset.hasOne(models.user, {
                    onDelete: 'cascade'
                })
            }
        }
    });

    return dataset
};
