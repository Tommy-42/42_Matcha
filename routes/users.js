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

/* GET users listing. */
router.get('/', checkAuth, function(req, res, next) {
  res.render('users/index', { title: 'User', authorized: req.checkAuth });
});
/* GET users creation. */
router.get('/new', checkAuth, function(req, res, next) {
  res.render('users/new', { title: 'New User', authorized: req.checkAuth });
});
/* POST users creation. */
router.post('/new', checkAuth, function(req, res, next) {

  var obj = req.body
  console.log(obj);
  res.render('users/new', { title: 'New User', authorized: req.checkAuth });
});

module.exports = router;
