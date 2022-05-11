
const router = require('express').Router();
const { User, Game, Review } = require('../../models');
const withAuth = require('../../utils/auth');

// router.get("/", async (req,res)=>{
//   try{
//     const reviewData= await Review.findAll({
//       where:{user_id: req.session.userId}
//     })
//     res.status(200).json(reviewData);
//   }
//   catch(err){
//     res.status(500).json(err);
//   }
// });

router.post('/addreview', withAuth, async (req,res)=>{
  try{
    const newReview= await Review.create(req.body)
    res.status(200).json(newReview);
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
        game_id: req.body.gameId,
        author_id: req.params.author_Id
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

router.delete('/:author_Id/delete', withAuth, async(req,res)=>{
  try{
    const deleteReview= await Review.destroy({
      where:{
        rating: req.body.rating,
        content: req.body.content,
        game_id: req.body.gameId,
        author_id: req.params.author_Id
      }
    })
    res.status(200).json(deleteReview);
  }
  catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;
