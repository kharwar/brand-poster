const router = require("express").Router();
const userRouter = require('./user');
const businessRouter = require('./business');
const categoryRouter = require('./category');
const adminRouter = require('./admin');
const imageRouter = require('./image');

const isAuth = require("../middleware/isAuth");

router.use("/user", userRouter);
router.use("/business", isAuth, businessRouter);
router.use('/category', isAuth, categoryRouter);
router.use('/admin', adminRouter);
router.use('/image', isAuth, imageRouter);

module.exports = router;