"use strict";

module.exports = {

  userIsLogged: function(req, res, next) {

    if ( req.session && req.session.user_id == null ) {
      res.render('error', {
        title: 'New User',
        authorized: false,
        msg: 'You need to log in first',
        msg_detailed: 'You will be redirected shortly.',
        script: 'window.setTimeout(function(){ window.location.href = window.location.origin + "/user/login"; }, 3000);'
      });
    }
    req.checkAuth = true;
    next();
  },
  userIs: function(req, res, next) {
      
  }
}