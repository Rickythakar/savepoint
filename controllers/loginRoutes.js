const router = require('express').Router();
const {User} = require("../models");

router.get('/login', async(req,res)=>{
    try{
        if(req.session.loggedIn==true){
            res.redirect('/home');
        } else{
            res.render('login' ,{
                isLogin: true
            })

        }
    } catch(err){
        res.status(500).json(err);
    }
});

router.get('/signup', async(req,res)=>{
    try{
        if(req.session.loggedIn==true){
            res.redirect('/home');
        } else{
            res.render('signup', {
                isLogin: true
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
        console.log(newUser);
        if(!newUser){
            res.status(400).json({message:"Your password must at least be 8 characters and you need to have a valid email."});
        }
        console.log(newUser.toJSON())
        req.session.save(()=>{
            req.session.loggedIn= true;
            req.session.userId= newUser.id;
            res.status(200).json(newUser);
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
            if(!validPass) {res.status(400).json({message:"Incorrect password. Try again please."})};
            req.session.save(()=>{
                req.session.loggedIn= true;
                req.session.userId= userData.id;
                res.status(200).json(userData);
            })
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