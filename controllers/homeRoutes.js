const router = require('express').Router();
const { User, Game } = require('../models');

router.get('/', async (req, res) => {
  try {
    const gamesArr=[];
    for(i=0; i<3;i++){
      showcaseItem= await Game.findByPk(Math.floor(Math.Random*200),{
        attributes: ['cover_art_url','title','id']
      });

    }

    

    res.render('homepage', { 
      isLogin: false,
      loggedIn: req.session.loggedIn 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
