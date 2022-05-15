const router = require('express').Router();
const{User, Game} = require("../models");
const withAuth = require('../utils/auth');

router.get('/', async (req,res)=>{
    console.log("getting user...");
    try{
        const currUser= await User.findOne({
            attributes:['username'],
            where:{
                id: req.session.userId
            },
            include:{
                model: Game,
                attributes:['title',  'id'],
                through:{
                    attributes:['played']
                }
            } 
        });
        const userData= currUser.get({plain:true});

        res.render("favorites",{
            userData,
            loggedIn: req.session.userId,
            isLogin: false
        })

    }
    catch(err){
        res.status(500).json(err)
    }
});

module.exports= router;