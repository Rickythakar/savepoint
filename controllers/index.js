const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const favoritesRoutes = require('./favoritesRoutes');
const loginRoutes = require('./loginRoutes');

router.use('/landing', loginRoutes);
router.use('/favorites', favoritesRoutes);
router.use('/api', apiRoutes);
router.use('/home', homeRoutes);

router.get('/', (req,res)=>{
    res.redirect("/landing/login")
})

module.exports = router;
