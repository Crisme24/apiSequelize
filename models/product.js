'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    quantity: DataTypes.INTEGER,
    status: DataTypes.STRING,
    image: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {});
  Product.associate = function(models) {
    Product.belongsTo(models.User);
    Product.belongsToMany(models.Category,{
      through:models.CategoryProduct
    })
    Product.belongsToMany(models.Transaction,{
      through:models.ProductTransaction
    });
  };
  return Product;
};