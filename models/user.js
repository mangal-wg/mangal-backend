"use strict";

module.exports = function(sequelize, DataTypes) {
    var user = sequelize.define('user', {
      first:{
        type: DataTypes.STRING
      },
      last:{
        type: DataTypes.STRING
      },
      email:{
        type: DataTypes.STRING
      },
      orcid:{
        type: DataTypes.STRING
      },
      organization:{
        type: DataTypes.STRING
      }
    });

    return user

};
