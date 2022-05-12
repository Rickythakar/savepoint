const router = require('express').Router();
const { Playlist} = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/:gameId/add', async (req,res)=>{
  try{
    const newGame= await Playlist.create({
      user_id: req.session.userId,
      game_id: req.params.gameId
    })
    res.status(200).json(newGame);
  }
  catch(err){
    res.status(500).json(err);
  }
});

router.put('/:gameId',  async (req,res)=>{
  try{
    const newPlayed= await Playlist.update({
      played: true
    },
    {
      where:{
        user_id: req.session.userId,
        game_id: req.params.gameId
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

router.delete('/:gameId/delete', withAuth, async(req,res)=>{
  try{
    const removed= await Playlist.destroy({
      where:{
        user_id: req.session.userId,
        game_id: req.params.gameId
      }
    })
    res.status(200).json(removed);
  }
  catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;
