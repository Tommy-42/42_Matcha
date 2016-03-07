var express = require('express');
var router = express.Router();
var userValidation = require('../lib/userValidation.js');

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

/* re-route to the index. */
router.get('/', checkAuth, function(req, res, next) {
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  res.redirect('/');
});

/**
 *  USER inscription validator
 */

/* NO-ONE Should be here */
router.get('/user', checkAuth, function(req, res, next) {
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  res.redirect('/');
});

/* Username validator */
router.get('/user/new', function(req, res, next) {
  var obj = req.query.obj;
  userValidation.newInput(obj, req, res, next);
});

/**
 *  USER VALIDATE
 */

module.exports = router;
