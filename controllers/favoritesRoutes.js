const router = require('express').Router();
const{User, Playlist, Game} = require("../models");
const withAuth = require('../utils/auth');

router.get('/', async (req,res)=>{
    try{
        const currUser= await User.findOne({
            attributes:['username'],
            where:{
                id: req.body.userId
            },
            include:{
                model: Game,
                attributes:['title'],
                through:{
                    attributes:['played']
                }
            } 
        });
        const user= currUser.get({plain:true});
        res.status(200).json(user);

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