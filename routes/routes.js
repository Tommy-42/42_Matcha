var express = require('express');
var router = express.Router();

// midleware checking if user is log
function checkAuth(req, res, next) {
	console.log(req.session);
    if ( req.session && req.session.user_id == null ) {
      res.render('error', {
        title: 'New User',
        authorized: false,
        msg: 'You need to log in first',
        msg_detailed: 'You will be redirected shortly.',
        script: 'window.setTimeout(function(){ window.location.href = window.location.origin + "/user/login"; }, 3000);'
      });
    } else {
      req.checkAuth = true;
      next();
    }
}


var routes = {};
routes.render = require('./render');
routes.user = require('./user');

/* Home rooting */
router.get('/', routes.render.home.index);

/* User rooting */

// creating new user
router.get('/user/new', routes.render.user.register);
router.post('/user/new', routes.user.register);

// user account information
router.get('/user/me', checkAuth, routes.render.user.me);

// user email validation
router.get('/user/emailvalidation', routes.user.emailvalidation);

// user login / logout
router.get('/user/login', routes.render.user.login);
router.post('/user/login', routes.user.login);
router.get('/user/logout', checkAuth, routes.user.logout);

/* Profile rooting */

// user profile
router.get('/profile/:username', checkAuth, routes.render.profile.user)
router.get('/profile/:username/edit', checkAuth, routes.render.profile.edit)
// users profiles
router.get('/profile/', checkAuth, routes.render.profile.users);

module.exports = router;