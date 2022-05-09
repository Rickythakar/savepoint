const router = require('express').Router();
const {User} = require("../models");

router.get('/', async(req,res)=>{
    try{
        if(req.session.loggedIn){
            res.redirect('/home');
        } else{
            res.render("login", {
                loggedIn: req.session.loggedIn,
            })
        }
    } catch(err){
        res.status(500).json(err);
    }
});

router.post('/', async(req,res)=>{
    try{
        const newUser= await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        req.session.save(()=>{
            req.session.loggedIn= true;
            res.status(200).json(newUser);
            console.log("You are logged in now.");
        })

    } catch(err){
        res.status(500).json(err);
    }
});

router.post('/login', async(req,res)=>{
    try{
        const userData= await User.findOne({
            where:{
                [Op.or]:
                [{email:req.body.email},
                {username:req.body.username}]
            }});

        if(!userData){
            res.status(400).json({message:"Incorrect email/username. Try again please."});
        } else{
            const validPass= await userData.checkPassword(req.body.password);
            if(!validPass) res.status(400).json({message:"Incorrect password. Try again please."});
            else{
                req.session.loggedIn= true; 
                res.status(200).json(userData);
            console.log("You are logged in now.");
            }    
        }
    } catch(err){
        res.status(500).json(err);
    }
});

router.post('/logout', async(req,res)=>{
    if(req.session.loggedIn) {
        req.session.destroy(()=>{
            res.status(204).end();
        })
     } else {
        res.status(404).end();
    }
});

module.exports = router;