const withAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    res.redirect('/landing');
  } else {
    next();
  }
};

module.exports = withAuth;
