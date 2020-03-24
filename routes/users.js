const router = require('express').Router();
const UserController = require('../controllers/UserController');
const {authentication,isAdmin} = require('../middleware/authentication.js')

router.post('/register',UserController.register);
router.post('/login',UserController.login);
router.get('/info',authentication, UserController.getInfo);//como hago para verificar el usuario?
router.put('/:id', UserController.update);
router.delete('/:id', UserController.delete);

module.exports = router;