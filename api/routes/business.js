const router = require('express').Router();
const businessController = require('../controllers/business');

router.post('/', businessController.createBusiness);
router.put('/', businessController.updateBusiness);
router.delete('/', businessController.deleteBusiness);
router.get('/:id', businessController.getBusiness);
router.get('/', businessController.getMyBusinesses);

module.exports = router;