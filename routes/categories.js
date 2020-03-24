const router = require('express').Router();
const CategoryController = require('../controllers/CategoryController');
const {isAdmin} = require('../middleware/authentication.js')

router.get('/', CategoryController.showAll);
router.get('/name/:name', CategoryController.showOneByName);
router.get('/:id', CategoryController.showOne);
router.post('/', CategoryController.store);
router.put('/:id', CategoryController.update);
router.delete('/:id', CategoryController.delete);


module.exports = router;