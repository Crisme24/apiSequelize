const { Category, Product, CategoryProduct, Sequelize, sequelize } = require('../models/index');
const { Op } = Sequelize;

const CategoryController = {
    async showAll(req,res) {
        await Category.findAll({
            include: [Product]
        })
        .then(categories=>res.send(categories))
    },

    async showOne(req,res) {
        await Category.findByPk(req.params.id, {
            include: [Product]
        })
            .then(categories => res.send(categories))
    },

    async showOneByName(req, res) {
        
        await Category.findOne({
                where: {
                    name: {
                        [Op.like]: `%${req.params.name}%`
                    }
                },
            })
            .then(categories => res.send(categories))
    },

    async store(req,res){
        try{
            const category = await Category.create({
                name:req.body.name
            });
            res.status(201).send({
            category,
            message:'Category created successfully'
            });
    
        } catch (error) {
            console.log(error);
            res.status(500).send({
            message:'Category not created'
            });
        }
    },

    async update (req, res) {
        try {
          await Category.update({
            ...req.body
          }, {
            where: {
              id: req.params.id
            }
          });
          const category = await Category.findByPk(req.params.id);
          res.status(200).send({
              category,
              message: 'Category updated successfully'});
        } catch (error) {
          console.log(error)
          res.status(500).send({message: 'Category not update'})
        }
    },


    async delete(req, res) {
        try {
        await Category.destroy({
            where: {
                id: req.params.id
            }
        })
            res.status(200).send({
              message: 'Category removed successfully'});
        } catch (error) {
          console.log(error)
          res.status(500).send({message: 'Category not removed'})
        }
    },
}

module.exports = CategoryController;