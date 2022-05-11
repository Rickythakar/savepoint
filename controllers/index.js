const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const favoritesRoutes = require('./loginRoutes');
const loginRoutes = require('./loginRoutes');

router.use('/landing', loginRoutes);
router.use('/favorites', favoritesRoutes);
router.use('/api', apiRoutes);
router.use('/home', homeRoutes);



module.exports = router;
