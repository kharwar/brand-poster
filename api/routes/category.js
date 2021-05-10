const router = require('express').Router();
const categoryController = require('../../api/controllers/category');

router.post('/', categoryController.createCategory);
router.put('/', categoryController.updateCategory);
router.delete('/', categoryController.deleteCategory);
router.get('/:id', categoryController.getCategory);
router.get('/', categoryController.getAllCategories);

module.exports = router;