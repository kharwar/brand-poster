const imageController = require('../controllers/image');
const router = require('express').Router();

router.post('/upload', imageController.upload);
router.delete('/delete', imageController.delete);

module.exports = router;