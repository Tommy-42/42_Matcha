var express = require('express');
var router = express.Router();

// midleware checking if user is log
function checkAuth(req, res, next) {
	console.log(req.session);
    if ( req.session.user_id != 1 ) {
      req.checkAuth = false;
      next();
    } else {
      req.checkAuth = true;
      next();
    }
}


var routes = {};
routes.render = require('./render');
routes.user = require('./user');

/* Home rooting */
router.get('/', checkAuth, routes.render.home.index);

/* User rooting */
router.get('/user/new', checkAuth, routes.render.user.register);
router.post('/user/new', checkAuth, routes.user.register);

router.get('/user/login', checkAuth, routes.render.user.login);
router.post('/user/login', checkAuth, routes.user.login);

module.exports = router;