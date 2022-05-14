const router= require('express').Router();
const {Game, Genre, Platform, Review} = require("../../models");
const {Op} = require("sequelize");



router.get("/", async(req,res) =>{
    try{
        const gameData= await Game.findAll({
            attributes: ['title', 'rating', 'id', 'cover_art_url'],
            include:[{
                model: Genre,
                attributes: ["g_tag"],
                through:{
                    attributes:[]
                }
            },
            {
                model: Platform,
                attributes: ["p_tag"],
                through:{
                    attributes:[]
                }
            }]
        });
        console.log(gameData)
        if(!gameData) res.status(404).json({message:"Sorry something went wrong."});
        const gameResults =  gameData.map((game)=> {
            return game.get({plain:true});
        });
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
        console.log("looking for games")
        console.log(searchTerm);
        const gameData= await Game.findAll({
            attributes: ['title', 'rating', 'id', 'cover_art_url'],
            where:{
                title:{
                    [Op.like]: `%${searchTerm}%`
                }
            },
            include:[{
                model: Genre,
                attributes: ["g_tag"],
                through:{
                    attributes:[]
                }
            },
            {
                model: Platform,
                attributes: ["p_tag"],
                through:{
                    attributes:[]
                }
            }]
})
        if(!gameData) res.status(404).json({message:"Sorry no games found with those paramaters :(."});
        console.log(gameData);
        const gameResults = gameData.map((game)=> {
            return game.toJSON();
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
            include: [{
                model: Genre,
                attributes: ["g_tag"],
                through:{
                    attributes:[]
                }
            },
            {
                model: Platform,
                attributes: ["p_tag"],
                through:{
                    attributes:[]
                }
            },
            {
                model: Review
            }
        ]
    });
        if(!gameData) res.status(404).json({message: "No game found with this ID"});

        gameData.release_date= await gameData.convertDate();
        const gameResult = gameData.get({plain:true})
        console.log(gameResult);
        res.render ('gameDetails',{
            gameResult,
            isLogin: false
        })
    }
    catch(err){
        res.status(400).json(err);
    }
});

module.exports= router;