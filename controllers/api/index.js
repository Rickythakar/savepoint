const router = require('express').Router();
const reviewRoutes = require('./reviewRoutes');
const gameRoutes = require('./gameRoutes');

router.use('/reviews', reviewRoutes);
router.use('/games', gameRoutes);

module.exports = router;
