const router = require('express').Router();
const TransactionController = require('../controllers/TransactionController');

router.get('/', TransactionController.showAll);
router.get('/:id', TransactionController.showOne);
router.post('/', TransactionController.store);
router.put('/:id', TransactionController.update);


module.exports = router;