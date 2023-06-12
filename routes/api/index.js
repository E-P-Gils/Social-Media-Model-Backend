const router = require('express').Router();
const userRoutes = require('./userroutes');
const thoughtRoutes = require('./thoughtroutes');

router.use('/userroutes', userRoutes);
router.use('/thoughtroutes', thoughtRoutes);

module.exports = router;