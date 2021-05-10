const userController = require('../controllers/user');
const isAuth = require('../middleware/isAuth');
const router = require('express').Router();

router.post('/', userController.register);
router.post('/login', userController.login);
router.put('/', isAuth, userController.updateUser);
router.delete('/', isAuth, userController.deleteUser);
router.put('/changePassword/', isAuth, userController.changePassword);
router.get('/:id', userController.getUser);
router.get('/', userController.getAllUsers);
router.get('/current', isAuth, userController.current);

module.exports = router;