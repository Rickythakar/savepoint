const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
// const loginRoutes = require('./loginRoutes');
const favoritesRoutes = require('./loginRoutes');

// router.use('/', loginRoutes);
router.use('/favorited', favoritesRoutes);
router.use('/api', apiRoutes);
router.use('/home', homeRoutes);



module.exports = router;
