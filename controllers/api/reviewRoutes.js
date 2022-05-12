
const router = require('express').Router();
const { User, Game, Review } = require('../../models');
const withAuth = require('../../utils/auth');


router.post('/addreview',  async (req,res)=>{
  console.log(req.body)
  try{
    const newReview= await Review.create({
      rating: req.body.rating,
      content: req.body.content,
      game_id: req.body.game_id,
      author_id: req.body.author_id,
    })
    res.status(200).json(newReview);
    res.render('favorites')
  }
  catch(err){
    res.status(500).json(err);
  }
});

router.put('/:author_Id', withAuth, async (req,res)=>{
  try{
    const updatedReview = await Review.update({
    },
    {
      where:{
        rating: req.body.rating,
        content: req.body.content,
        game_id: req.body.game_id,
        author_id: req.params.author_id
      }
    })
    if(!updatedReview){
      res.status(404).json({message:"Something went wrong :( Review not updated."});
    }
    res.status(200).json(updatedReview);
  }
  catch(err){
    res.status(500).json(err);
  }
});

router.delete('/:author_id/delete', withAuth, async(req,res)=>{
  try{
    const deleteReview= await Review.destroy({
      where:{
        rating: req.body.rating,
        content: req.body.content,
        game_id: req.body.game_id,
        author_id: req.params.author_id
      }
    })
    res.status(200).json(deleteReview);
  }
  catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;
