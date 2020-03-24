const { Transaction, Product } = require('../models/index');

const TransactionController = {
    async showAll(req,res) {
        
        await Transaction.findAll({
            include:[Product]
        })
        .then(transactions=>res.send(transactions))
    },

    async showOne(req,res) {
        await Transaction.findByPk(req.params.id, {
            include:[Product]
        })
            .then(transactions => res.send(transactions))
    },

        async store (req,res) {
        try {
            const transaction = await Transaction.create({
                status: 'In process',
                deliveryDate: req.body.deliveryDate
            });
            req.body.products.forEach(product => {
                 transaction.addProduct(product.id, {
                    through: {
                        quantity: product.quantity
                    }
                });
            })
            res.status(201).send({
            transaction,
            message:'Transaction created successfully'
            });
    
        } catch (error) {
            console.log(error);
            res.status(500).send({
            message:'Failed transaction'
            });
        }
    },

    async update (req, res) {
        try {
          await Transaction.update({
            ...req.body
          }, {
            where: {
              id: req.params.id
            }
          });
          const transaction = await Transaction.findByPk(req.params.id);
          res.status(200).send({
              transaction,
              message: 'Transaction updated'});
        } catch (error) {
          console.log(error)
          res.status(500).send({message: 'Transaction not updated'})
        }
    },

}

module.exports = TransactionController;