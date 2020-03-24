const router = require('express').Router();
const ProductController = require('../controllers/ProductController');
const {authentication, isAdmin} = require('../middleware/authentication.js')
const multipart = require('connect-multiparty');
const md_upload = multipart({ uploadDir: './upload/products'});

router.get('/', ProductController.showAll);
router.get('/name/:name', ProductController.showOneByName);
router.get('/:id', ProductController.showOne);
router.post('/upload-image/:id', md_upload, ProductController.upload);
router.post('/',authentication,isAdmin, ProductController.store);
router.put('/:id', ProductController.update);
router.delete('/:id', ProductController.delete);


module.exports = router;