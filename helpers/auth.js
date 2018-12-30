module.exports = {
  ensureAuthenticated: function(req, res, next){
    if(req.isAuthenticated()){
      return next();
    }
    req.flash('error_msg', `veuillez s'authentifier d'abord`);
    res.redirect('/users/login');
  }
}

