"use strict";

module.exports = function(sequelize, DataTypes) {
    var network = sequelize.define('network', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "Name of the collected network"
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            comment: "Collection date"
        },
        localisation:{
          type: DataTypes.GEOMETRY('POINT')
        },
        description: {
            type: DataTypes.TEXT('long'),
            comment: "Description of the network collected"
        },
        public: {
            type: DataTypes.BOOLEAN,
            comment: "Is this network is available publicly? "
        }

    }, {
        classMethods: {
            associate: function(models) {
                network.hasOne(models.user, {
                    onDelete: 'cascade'
                })
            },
            indexes: [{
                name: 'idx_network_date',
                method: 'BTREE',
                fields: ['date']
            }, {
                name: 'idx_network_name',
                method: 'BTREE',
                fields: ['name']
            }, {

            }]
        }
    });
    return network
};
