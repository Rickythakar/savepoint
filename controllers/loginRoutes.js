const router = require('express').Router();
const {User} = require("../models");

const stylesheetHref= "../../public/css/landing.css";
const scriptSrc= "../../public/js/landing.js";

router.get('/', async(req,res)=>{
    try{
        if(req.session.loggedIn){
            res.redirect('/home');
        } else{
            res.render("loginlandingpage", {
                isLogin: true,
                isSignup: false,
                script: scriptSrc
            })

        }
    } catch(err){
        res.status(500).json(err);
    }
});

router.get('/signup', async(req,res)=>{
    try{
        if(req.session.loggedIn){
            res.redirect('/home');
        } else{
            res.render("loginlandingpage", {
                isLogin: true,
                isSignup: true
            })
        }
    } catch(err){
        res.status(500).json(err);
    }
});

router.post('/signup', async(req,res)=>{
    try{
        const newUser= await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        req.session.save(()=>{
            req.session.loggedIn= true;
            req.session.userId= newUser.id;
            res.redirect('/home');
        })
    } 
    catch(err){
        res.status(500).json(err);
    }
});

router.post('/login', async(req,res)=>{
    try{
        const userData= await User.findOne({
            where:{
                email:req.body.email
            }});

        if(!userData){
            res.status(400).json({message:"Incorrect email. Try again please."});
        } else{
            const validPass= userData.checkPassword(req.body.password);
            if(!validPass) res.status(400).json({message:"Incorrect password. Try again please."});
            else{
                req.session.loggedIn= true; 
                req.session.userId= userData.id;
                res.redirect('/home');
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