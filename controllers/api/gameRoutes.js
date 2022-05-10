const router= require('express').Router();
const {Game, Genre, Platform} = require("../../models");

router.get("/", async(req,res) =>{
    try{
        const gameData= await Game.findAll({
            include: [Genre,Platform]
        })
        res.status(200).json(gameData);
    }
    catch(err){
        res.status(400).json(err);
    }
}); 

router.get("/games/:gameName", async(req,res) =>{
    try{
        const gameData= await Game.findOne({
            where:{
                title: req.params.gameName
            },
            include:[Genre,Platform]
        })
        res.status(200).json(gameData)
    }
    catch(err){
        res.status(400).json(err);
    }
}); 

module.exports= router;