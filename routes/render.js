"use strict";

exports.home = {
	index: function(req, res) {
		console.log(req.session);
		res.render('index', { title: 'Matcha', authorized: req.checkAuth });
	}
}

exports.user = {
	register: function(req, res) {
		res.render('user/new', { title: 'New User', authorized: req.checkAuth });
  },
  login: function(req, res ) {
    res.render('user/login', { title: 'Matcha Login', authorized: req.checkAuth });
  },
	me: function(req, res) {
		res.render('user/me', {title: "My Account", authorized: req.checkAuth });
	}
}

exports.profile = {
	user: function(req, res) {
		res.render('profile/user', {title: "User profile", authorized: req.checkAuth });
	},
	users: function(req, res) {
		res.render('profile/users', {title: "Users search", authorized: req.checkAuth });
	},
	edit: function(req, res) {
		res.render('profile/edit', {title: "Editing profile", authorized: req.checkAuth });
	}
}