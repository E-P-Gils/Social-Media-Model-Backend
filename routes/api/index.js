const router = require('express').Router();
const userRoutes = require('./userroutes');
const thoughtRoutes = require('./thoughtroutes');

router.use('/user', userRoutes);
router.use('/thought', thoughtRoutes);

module.exports = router;