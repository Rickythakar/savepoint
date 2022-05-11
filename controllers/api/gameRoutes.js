const router= require('express').Router();
const {Game, Genre, Platform} = require("../../models");
const {Op} = require("sequelize");

router.get("/", async(req,res) =>{
    try{
        const gameData= await Game.findAll({
            include: [Genre,Platform]
        })
        if(!gameData) res.status(404).json({message:"Sorry something went wrong."});
        const sResults= gameData.get({plain:true});
        res.render("searchResults",{
            logged_in: req.session.loggedIn,
            sResults
        });
    }
    catch(err){
        res.status(400).json(err);
    }
}); 

router.get("/:gameName", async(req,res) =>{
    try{
        const searchTerm= req.params.gameName;
        console.log(searchTerm);
        const gameData= await Game.findAll({
            where:{
                title:{
                    [Op.like]: `%${searchTerm}%`
                }
            },
            include:[Genre,Platform]
        })
        if(!gameData) res.status(404).json({message:"Sorry no games found with those paramaters :(."});
        const sResults= gameData.get({plain:true});
        res.render("searchResults",{
            logged_in: req.session.loggedIn,
            sResults
        });
    }
    catch(err){
        res.status(400).json(err);
    }
}); 

module.exports= router;