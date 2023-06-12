const router = require('express').Router();
const postRoutes = require('../../controllers/user');
const userRoutes = require('../../controllers/thought');

router.use('/user', postRoutes);
router.use('/thought', userRoutes);

module.exports = router;