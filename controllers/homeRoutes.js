const router = require('express').Router();
const { User, Game } = require('../models');

router.get('/', async (req, res) => {
  try {
    const gamesArr=[];
    for(i=0; i<12;i++){
      let random= Math.floor(Math.random()*200);
      console.log(random);
      let showcaseItem= await Game.findByPk(random,{
        attributes: ['cover_art_url','title','id']
      });
      
      showcaseGame= showcaseItem.get({plain:true});
      gamesArr.push(showcaseGame);
    }
    console.log(gamesArr);
    res.render('homepage', { 
      isLogin: false,
      gamesArr,
      loggedIn: req.session.loggedIn 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
