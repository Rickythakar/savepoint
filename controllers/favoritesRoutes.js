const router = require('express').Router();
const{User, Game} = require("../models");
const withAuth = require('../utils/auth');

router.get('/', async (req,res)=>{
    console.log("getting user...");
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
        const userData= await currUser.get({plain:true});

        res.render("favorites",{
            userData,
            loggedIn: true,
            isLogin: false
        })

    }
    catch(err){
        res.status(500).json(err)
    }
});

module.exports= router;