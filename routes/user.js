"use strict";
var validator = require('../lib/validator.js')

exports.register = function( req, res) {

  /*
  {
    username: 'test',
    birthday: '1998-11-19',
    gender: '0',
    email: 'test@test.fr',
    password: 'test',
    confirm_password: 'test',
    submit: 'Submit'
  }
  */

  var user = req.body;

  user.email.isValidEmail();

  req.getConnection(function(err,connection) {
      connection.query('SELECT * FROM users WHERE username = ?',[user.email],function(err,rows) {
        if(err)
          console.log("Error Selecting : %s ",err );
        else {
          error = rows.length == 1 ? true : false;
          if( error ) {
            res.send('users/new', {
              authorized: req.checkAuth,
              error: "The Username is already taken"
            });
          }
          else
            res.send('users/new', { error: error, authorized: req.checkAuth });
        }
      });
    });


  if( 1 == 2  ) {
    res.status(200).render('user/success', { 
      title: 'Successful registration',
      authorized: req.checkAuth,
      msg: 'Good Job !',
      msg_detailed: 'Your account have been successfully registered, you must validate your email now.'
    });
  }
  else {
    res.status(400).render('user/new', { 
      title: 'Error registration',
      authorized: req.checkAuth,
      msg: 'Ho ? Something\'s wrong !',
      msg_detailed: 'Error: '
    }); 
  }
}