const withAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    console.alert("You need to be logged in to view this content.");
    res.redirect('/landing');
  } else {
    next();
  }
};

module.exports = withAuth;
