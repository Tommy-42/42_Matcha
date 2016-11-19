"use strict";

exports.home = {

  index: function( req, res) {
    res.render('index', { title: 'Matcha', authorized: req.checkAuth });
  }
}