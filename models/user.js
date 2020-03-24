'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    role: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Token);
    User.hasMany(models.Product);
  };
  return User;
};