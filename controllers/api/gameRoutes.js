const router= require('express').Router();
const {Game, Genre, Platform} = require("../../models");
const {Op} = require("sequelize");

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
        res.status(200).json(gameData)
    }
    catch(err){
        res.status(400).json(err);
    }
}); 

module.exports= router;