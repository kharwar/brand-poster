const router = require('express').Router();
const adminController = require('../controllers/adminUser');
const isAuth = require('../middleware/isAuth');

router.post('/initialize', adminController.initialize);
router.post('/login', adminController.login);
router.get('/', isAuth, adminController.admin);

module.exports = router;