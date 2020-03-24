'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductTransaction = sequelize.define('ProductTransaction', {
    TransactionId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {});
  ProductTransaction.associate = function(models) {
  };
  return ProductTransaction;
};