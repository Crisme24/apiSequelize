const { Product, Category, CategoryProduct, User, Sequelize, sequelize } = require('../models/index');
const { Op } = Sequelize;
const validator = require('validator');
const fs = require('fs');
const path = require('path');

const ProductController = {
    async showAll(req,res) {
        
        await Product.findAll({
            include:[Category]
        })
        .then(products=>res.send(products))
    },

    async showOne(req,res) {
        await Product.findByPk(req.params.id, {
            include:[Category]
        })
            .then(products => res.send(products))
    },

    async showOneByName(req, res) {
        
        await Product.findOne({
                where: {
                    name: {
                        [Op.like]: `%${req.params.name}%`
                    }
                },
            })
            .then(products => res.send(products))
    },

    async store (req,res) {
        try {
            const product = await Product.create({
                ...req.body,
                UserId:req.user.id
            });
            product.addCategory(req.body.categories)
            res.status(201).send({
            product,
            message:'Product created successfully'
            });
    
        } catch (error) {
            console.log(error);
            res.status(500).send({
            message:'Product not created'
            });
        }
    },

    async update (req, res) {
        try {
          await Product.update({
            ...req.body
          }, {
            where: {
              id: req.params.id
            }
          });
          const product = await Product.findByPk(req.params.id);
          res.status(200).send({
              product,
              message: 'Product updated successfully'});
        } catch (error) {
          console.log(error)
          res.status(500).send({message: 'Product not updated'})
        }
    },


    async delete(req, res) {
        try {
        await Product.destroy({
            where: {
                id: req.params.id
            }
        })
            res.status(200).send({
              message: 'Product removed successfully'});
        } catch (error) {
          console.log(error)
          res.status(500).send({message: 'Product not removed'})
        }
    },

 upload(req,res){
        
            //Configurar el modulo connect multiparty router/products.js

            //Recoger el fichero de la peticion
            const file_name = 'Image not upload...';

            if(!req.files){
                return res.status(404).send({
                    status: 'error',
                    message: file_name
                });
            }

            //Conseguir nombre y extencion de la imagen
            const file_path = req.files.file0.path;
            const file_split = file_path.split('\\');
           
            //Nombre del archivo
            const file_newname = file_split[2];

            //Extension del archivo
            const extension_split = file_newname.split('\.');
            const file_ext = extension_split[1];

            //Comprobar la extension, solo imagenes si es invalida borrar el fichero
            if(file_ext != 'png' && file_ext != 'jpg' && file_ext != 'jpeg' && file_ext != 'gif'){
                //Borrar el archivo subido
                 fs.unlink(file_path, (err) => {
                     return res.status(200).send({
                         status: 'error',
                         message: 'The image extension is not valid'
                     })
                });
            }else{
                //Falta guardar la imagen en la base de datos!!!
                return res.status(200).send({
                    status: 'success',
                    message: 'image updated'
            });
        }   
    },
}

module.exports = ProductController;