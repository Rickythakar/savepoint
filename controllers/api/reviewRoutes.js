
const router = require('express').Router();
const { User, Game, Review } = require('../../models');
const withAuth = require('../../utils/auth');


router.post('/:id/add',  async (req,res)=>{
  console.log(req.body)
  try{
    const newReview= await Review.create({
      rating: req.body.rating,
      content: req.body.content,
      game_id: req.params.id,
      author_id: req.session.authorId
    })
    res.status(200).json(newReview);
    const postReview = newReview.post({plain:true})
    res.render('searchresult', {
        postReview,
        isLogin: false,
        logged_in: req.session.loggedIn,
    })
  }
  catch(err){
    res.status(500).json(err);
  }
});

router.put('/:id/change', withAuth, async (req,res)=>{
  try{
    const updatedReview = await Review.update({
    },
    {
      where:{
        rating: req.body.rating,
        content: req.body.content,
        game_id: req.params.id,
        author_id: req.session.authorId
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

router.delete('/:id/delete', withAuth, async(req,res)=>{
  try{
    const deleteReview= await Review.destroy({
      where:{
        rating: req.body.rating,
        content: req.body.content,
        game_id: req.body.game_id,
        author_id: req.session.authorId
      }
    })
    res.status(200).json(deleteReview);
  }
  catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;
