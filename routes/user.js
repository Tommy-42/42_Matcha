"use strict";
var vld = require('../lib/userValidator.js');
var dbuser = require('../lib/dbUser.js');

exports.register = function( req, res) {

  var user = req.body;
  var error = [];

  error.push( vld.isValidUsername(user.username) );
  error.push( vld.isValidBirthdate(user.birthday) );
  error.push( (user.gender == 0 ? null : user.gender == 1 ? null : ["Error Bad Gender"]) );
  error.push( vld.isValidEmail(user.email) );
  if( vld.isSamePassword(user.password, user.confirm_password) )
    error.push( vld.isValidPassword(user.password) );
  error = error.filter(function(v){if(v && v !== null) { return v.length > 0; }else{return false;}});

  if( error.length == 0 )
  {
    dbuser.select.emailExist(user.email, function(rows) {

      if( rows === -1 )
        error.push("An error occured please try again");
      else if ( rows === 1 )
        error.push("The choosen email address is already taken");

      if( error.length > 0 ) {
        res.status(400).render('user/new', { 
          title: 'Error registration',
          authorized: req.checkAuth,
          msg: 'Ho ? Something\'s wrong !',
          msg_detailed: 'Error: ' + error
        });
      }
      else {
        dbuser.insert.newUser(user, function(rows) {
          if( rows == 0 ) {
            res.status(400).render('user/new', { 
              title: 'Error registration',
              authorized: req.checkAuth,
              msg: 'Ho ? Something\'s wrong !',
              msg_detailed: 'Error: ' + error
            });
          }
          else {
            res.status(200).render('user/success', { 
              title: 'Successful registration',
              authorized: false,
              msg: 'Good Job !',
              msg_detailed: 'Your account have been successfully registered, you must validate your email now.',
              script: 'window.setTimeout(function(){ window.location.href = window.location.origin + "/user/login"; }, 3000);'
            });
          }
        });
      }
    });
  }
}
exports.login = function( req, res) {

  var user = req.body;
  var error = [];

  error.push( vld.isValidEmail(user.email) );
  var validpassword = vld.isValidPassword(user.password);
  if( validpassword )
    error.push( validpassword );
  error = error.filter(function(v){if(v && v !== null) { return v.length > 0; }else{return false;}});

  if( error.length == 0 )
  {
    dbuser.select.validAccount(user, function( rows ) {

      if( rows === -1 )
        error.push("An error occured please try again");
      else if ( typeof rows == "string" )
        error.push(rows);

      if( error.length > 0 ) {
        res.status(400).render('user/login', { 
          title: 'Error login',
          authorized: req.checkAuth,
          msg: 'You fcking Dumb !?',
          msg_detailed: 'Error: ' + error
        });
      }
      else {
        req.session.user_id = rows[0].id;
        req.session.user_email = rows[0].email;
        req.session.user_username = rows[0].username;
        req.session.user_genrer = rows[0].gender;

        res.status(200).render('user/success', { 
          title: 'Successful Login',
          authorized: req.checkAuth,
          msg: 'Good Job !',
          msg_detailed: 'You will be redirected shortly.',
          script: 'window.setTimeout(function(){ window.location.href = window.location.origin + "/"; }, 3000);'
        });
      }
    });
  }
}
exports.logout = function( req, res) {

  req.session.user_id = null;
  req.session.user_email = null;
  req.session.user_username = null;
  req.session.user_genrer = null;

  res.status(200).render('user/success', { 
    title: 'Successful logout',
    authorized: req.checkAuth,
    msg: 'See you soon !',
    msg_detailed: 'You will be redirected shortly.',
    script: 'window.setTimeout(function(){ window.location.href = window.location.origin + "/"; }, 3000);'
  });
}
exports.emailvalidation = function(req, res) {

  var user = req.query;
  var error = [];

  var isValidToken = vld.isValidToken(user.token_email);

  if( !isValidToken )
    error.push(isValidToken);
  
  error = error.filter(function(v){if(v && v !== null) { return v.length > 0; }else{return false;}});

  if( error.length == 0 ) {

    dbuser.update.validateEmail(user.token_email, function(rows) {

      if( typeof rows == "string" ) {
        res.status(400).render('user/error', { 
          title: 'Error Token',
          authorized: req.checkAuth,
          msg: 'You fcking Dumb !?',
          msg_detailed: 'Error: ' + rows
        });
      }
      else {
        res.status(200).render('user/success', { 
          title: 'Successful Email validation',
          authorized: req.checkAuth,
          msg: 'Successful Email validation!',
          msg_detailed: 'You will be redirected shortly.',
          script: 'window.setTimeout(function(){ window.location.href = window.location.origin + "/user/login"; }, 3000);'
        });
      }
    });   
  }
}