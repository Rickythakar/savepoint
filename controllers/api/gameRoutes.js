const router= require('express').Router();
const {Game, Genre, Platform, Review} = require("../../models");
const {Op} = require("sequelize");



router.get("/", async(req,res) =>{
    try{
        const gameData= await Game.findAll({
            attributes: ['title', 'rating', 'id']
        });
        console.log(gameData)
        if(!gameData) res.status(404).json({message:"Sorry something went wrong."});
        const gameResults =  gameData.map((game)=> {
            game.get({plain:true});
        });
        console.log(gameResults);
        res.render('searchResults', {
            loggedIn: req.session.loggedIn,  
            gameResults,
            isLogin: false
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
            attributes: ['title', 'release_date', 'rating', 'id'],
            where:{
                title:{
                    [Op.like]: `%${searchTerm}%`
                }
            },
            include:[Genre,Platform]
        })
        if(!gameData) res.status(404).json({message:"Sorry no games found with those paramaters :(."});
        const gameResults = gameData.map((game)=> {
            console.log(game);
            game= game.get({plain:true});
        });
        console.log(gameResults);
        res.render ('searchResults', {
            loggedIn: req.session.loggedIn,  
            gameResults,
            isLogin: false
        })

    }
    catch(err){
        res.status(400).json(err);
    }
}); 

router.get('/single/:id', async(req,res) => {
    try{
        const gameData = await Game.findByPk (req.params.id, {
            include: [Genre, Platform, Review]
        })
        if(!gameData) res.status(404).json({message: "No game found with this ID"});
        gameData.release_date= await gameData.convertDate();
        const gameResult = gameData.get({plain:true})
        console.log(gameResult);
        res.render ('gameDetails',{
            gameResult,
            isLogin: false
        })
        res.status(200).json(gameResult);
    }
    catch(err){
        res.status(400).json(err);
    }
});

module.exports= router;