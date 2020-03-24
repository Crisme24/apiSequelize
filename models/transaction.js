'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    status: DataTypes.STRING,
    deliveryDate: DataTypes.STRING
  }, {});
  Transaction.associate = function(models) {
    Transaction.belongsToMany(models.Product,{
      through:models.ProductTransaction
    })
  };
  return Transaction;
};