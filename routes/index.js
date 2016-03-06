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

/* GET home page. */
router.get('/', checkAuth,function(req, res, next) {
  res.render('index', { title: 'Matcha', authorized: req.checkAuth });
});

module.exports = router;
