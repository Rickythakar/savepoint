const router = require('express').Router();
const{User, Game} = require("../models");
const withAuth = require('../utils/auth');

router.get('/', async (req,res)=>{
    console.log("getting user...");
    console.log(req.session.userId)
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
            loggedIn: req.session.loggedIn,
            isLogin: false
        })

    }
    catch(err){
        res.status(500).json(err)
    }
});

module.exports= router;