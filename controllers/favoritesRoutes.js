const router = require('express').Router();
const{User, Playlist, Game} = require("../models");
const withAuth = require('../utils/auth');

router.get('/', async (req,res)=>{
    try{
        const currUser= await User.findByPk(req.session.userId);
        const user= currUser.get({plain:true});
        const playlData= await Playlist.findAll({
            where:{
                user_id: req.session.userId
            },
            include:[Game],
            attributes: ["game_id", "played"]
        })
        
        res.render('favorites',{
            user,
            logged_in: req.session.logged_in
        })
    
    }
    catch(err){
        res.status(500).json(err)
    }
});

module.exports= router;