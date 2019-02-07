"use strict";

module.exports = function(sequelize, DataTypes) {
    var node = sequelize.define('node', {
        original_name: {
            type: DataTypes.STRING,
            comment: "Name of the recorded taxon in the publication",
            allowNull: false,
            unique: "uq_name_network"
        }
    }, {
        underscored: true,
        classMethods: {
            associate: function(models) {
                node.hasMany(models.interaction, {
                        onDelete: 'cascade',
                        foreignKey: 'node_1'
                }),
                node.hasMany(models.interaction, {
                    onDelete: 'cascade',
                    foreignKey: 'node_2'
                }),
                node.hasMany(models.trait, {
                    onDelete: 'cascade',
                    foreignKey: 'node_id'
                })
            }
        }
    });

    return node

};
