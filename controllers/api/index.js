const router = require('express').Router();
const reviewRoutes = require('./reviewRoutes');
const playlistRoutes = require('./playlistRoutes');
const gameRoutes = require('./gameRoutes');

router.use('/reviews', reviewRoutes);
router.use('/playlist', playlistRoutes);
router.use('/games', gameRoutes);

module.exports = router;
