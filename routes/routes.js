var express = require('express');
var router = express.Router();

// midleware checking if user is log
function checkAuth(req, res, next) {
    if (!req.session.user_id) {
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

/* GET home page */
router.get('/', checkAuth, routes.render.home.index);

/* GET user registration page. */
router.get('/user/new', checkAuth, routes.render.user.register);

// User functions
// router.get('/user/new', checkAuth, routes.render.register);
// router.post('/user/new', checkAuth, routes.users.register);

// User functions
// router.get('/user/fetchUsersLdap', routes.ldap.fetchUsersLdap);
// router.get('/user/fetchUsers', routes.users.fetchUsers);
// router.get('/user/removeLoggedAs', routes.users.removeLoggedAs);
// router.get('/user/clearLogs', routes.users.clearLogs);
// router.post('/user/updateUser', routes.users.updateUser);
// router.post('/user/removeUser', routes.users.removeUser);
// router.post('/user/register', routes.users.register);
// router.post('/user/registerProject', routes.users.registerProject);

// /* POST users creation. */
// router.post('/new', checkAuth, function(req, res, next) {

//   var obj = req.body;

  

//   res.render('users/new', { title: 'New User', authorized: req.checkAuth });
// });

module.exports = router;