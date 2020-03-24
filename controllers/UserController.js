const { User, Token } = require('../models/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const { jwt_secret } = require('../config/config.json')[env];

const UserController = {
     async register(req, res) {
        try {
            const password = await bcrypt.hash(req.body.password, 9);
            const user =  await User.create({
                username: req.body.username,
                email: req.body.email,
                password,
                role: 'customer'
            });
            res.status(201).send({
                user,
                message: 'User created successfully'
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({
                message: 'User not created'
            });
        }
    },

    async login(req, res) {
        try {
            const user = await User.findOne({
                where: {
                    username: req.body.username
                }
            })
            if (!user) {
                return res.status(400).send({
                    message: 'User or password incorrect'
                })
            }
            const isMatch = await bcrypt.compare(req.body.password, user.password);
            if (!isMatch) {
                return res.status(400).send({
                    message: 'User or password incorrect'
                })
            }
            const token = jwt.sign({
                id: user.id
            }, jwt_secret);
            Token.create({
                token,
                UserId: user.id
            });
            
            res.send({
                message: 'Welcome ' + user.username,
                user,
                token
            })
        } catch (error) {
            console.log(error);
            res.status(500).send({
                message: 'Login incorrect'
            });
        }
    },
    async getInfo(req,res){
        res.send(req.user);
    },

    async update (req, res) {
        try {
          await User.update({
            ...req.body
          }, {
            where: {
              id: req.params.id
            }
          });
          const user = await User.findByPk(req.params.id);
          res.status(200).send({
              user,
              message: 'User updated successfully'});
        } catch (error) {
          console.log(error)
          res.status(500).send({message: 'User not update'})
        }
    },

    async delete (req, res) {
        try{
            await User.destroy({
                where: {
                  id: req.params.id
                }
              })
              res.status(200).send({
                  message:'User removed successfully'
                })
        }catch (error) {
                console.log(error)
                res.status(500).send({message:'User not deleted'})
        }
   },
}
    module.exports = UserController;