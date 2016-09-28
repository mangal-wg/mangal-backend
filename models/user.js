"use strict";

module.exports = function(sequelize, DataTypes) {
    var user = sequelize.define('user', {
        name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        orcid: {
            type: DataTypes.STRING
        },
        organization: {
            type: DataTypes.STRING
        }
    }, {
        underscored: true,
        classMethods: {
            associate: function(models) {
                user.hasMany(models.taxon, {
                        onDelete: 'cascade'
                    }),
                    user.hasMany(models.instanc, {
                        onDelete: 'cascade'
                    }),
                    user.hasMany(models.network, {
                        onDelete: 'cascade'
                    }),
                    user.hasMany(models.interaction, {
                        onDelete: 'cascade'
                    }),
                    user.hasMany(models.dataset, {
                        onDelete: 'cascade'
                    })
            }
        }
    })

    return user

};
