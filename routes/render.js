"use strict";

exports.home = {

	index: function( req, res) {
		res.render('index', { title: 'Matcha', authorized: req.checkAuth });
	}
}

exports.user = {

	register: function( req, res) {
		res.render('user/new', { title: 'New User', authorized: req.checkAuth });
  },
  login: function( req, res ) {
    res.render('user/login', { title: 'Matcha Login', authorized: req.checkAuth });
  }
}