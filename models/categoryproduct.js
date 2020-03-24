'use strict';
module.exports = (sequelize, DataTypes) => {
  const CategoryProduct = sequelize.define('CategoryProduct', {
    CategoryId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER
  }, {});
  CategoryProduct.associate = function(models) {
    // associations can be defined here
  };
  return CategoryProduct;
};