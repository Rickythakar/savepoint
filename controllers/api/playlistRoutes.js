const router = require('express').Router();
const { Playlist, User, Game } = require('../../models');
const withAuth = require('../../utils/auth');

router.get("/", withAuth, async (req,res)=>{
  try{
    const playlistData= await Playlist.findAll({
      where:{user_id: req.session.userId}
    })
    res.status(200).json(playlistData);
  }
  catch(err){
    res.status(500).json(err);
  }
});

router.post('/add', withAuth, async (req,res)=>{
  try{
    const newGame= await Playlist.create({
      user_id: req.session.userId,
      game_id: req.body.gameId
    })
    res.status(200).json(newGame);
  }
  catch(err){
    res.status(500).json(err);
  }
});

router.put('/:game_Id', withAuth, async (req,res)=>{
  try{
    const newPlayed= await Playlist.update({
      played: true
    },
    {
      where:{
        user_id: req.session.userId,
        game_id: req.params.game_Id
      }
    })
    if(!newPlayed){
      res.status(404).json({message:"Something went wrong :(. Game or user not found."});
    }
    res.status(200).json(newPlayed);
  }
  catch(err){
    res.status(500).json(err);
  }
});

router.delete('/:game_Id/remove', withAuth, async(req,res)=>{
  try{
    const removed= await Playlist.destroy({
      where:{
        user_id: req.session.userId,
        game_id: req.params.game_Id
      }
    })
    res.status(200).json(removed);
  }
  catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;
