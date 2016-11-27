"use strict";
var vld = require('../lib/userValidator.js');
var dbuser = require('../lib/dbUser.js');

exports.register = function( req, res) {

  var user = req.body;
  var error = [];

  console.log(user);

  error.push( vld.isValidUsername(user.username) );
  error.push( vld.isValidBirthdate(user.birthday) );
  error.push( (user.gender == 0 ? null : user.gender == 1 ? null : ["Error Bad Gender"]) );
  error.push( vld.isValidEmail(user.email) );
  if( vld.isSamePassword(user.password, user.confirm_password) )
    error.push( vld.isValidPassword(user.password) );
  error = error.filter(function(v){if(v && v !== null) { return v.length > 0; }else{return false;}});

  if( error.length == 0 )
  {
    var row = dbuser.select.emailExist(user.email);
    if( row === -1 )
      error.push("An error occured please try again");
    else if ( row === 1 )
      error.push("The choosen email address is already taken");
  }

  if( error.length > 0 ) {
    res.status(400).render('user/new', { 
      title: 'Error registration',
      authorized: req.checkAuth,
      msg: 'Ho ? Something\'s wrong !',
      msg_detailed: 'Error: ' + error
    });
  }
  else {
    dbuser.insert.newUser(user);
    res.status(200).render('user/success', { 
      title: 'Successful registration',
      authorized: req.checkAuth,
      msg: 'Good Job !',
      msg_detailed: 'Your account have been successfully registered, you must validate your email now.'
    });
  }
};
exports.login = function( req, res) {

  var user = req.body;
  var error = [];

  console.log(user);

  error.push( vld.isValidEmail(user.email) );
  if( vld.isSamePassword(user.password, user.confirm_password) )
    error.push( vld.isValidPassword(user.password) );
  error = error.filter(function(v){if(v && v !== null) { return v.length > 0; }else{return false;}});

  if( error.length == 0 )
  {
    var row = dbuser.select.validAccount(user);
    if( row === -1 )
      error.push("An error occured please try again");
    else if ( row === 1 )
      error.push("Invalid Username or password");
  }

  if( error.length > 0 ) {
    res.status(400).render('user/login', { 
      title: 'Error login',
      authorized: req.checkAuth,
      msg: 'You fcking Dumb !?',
      msg_detailed: 'Error: ' + error
    });
  }
  else {
    res.status(200).render('user/success', { 
      title: 'Successful Login',
      authorized: req.checkAuth,
      msg: 'Good Job !',
      msg_detailed: 'You will be redirected shortly.'
    });
  }
};
