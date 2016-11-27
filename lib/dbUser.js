"use strict";
var db = require('./db.js');
var bcrypt = require('bcryptjs');

module.exports = {

  select: {

    validAccount: function( creds, callback ) {
      db.query('SELECT * FROM users WHERE email = ?', [creds.email], function(err, rows) {
        if(err) {
          console.log("Error Selecting : %s ",err );
          callback(-1);
        }
        else {
          if( rows.length === 1 ) {
            if( bcrypt.compareSync(creds.password, rows[0].password) )
              callback(1);
            else
              callback(0);
          }
          else
            callback(0);
        }
      });
    },
    emailExist: function( email, callback ) {
      db.query('SELECT * FROM users WHERE email = ?',[email], function(err,rows) {
        if(err) {
          console.log("Error Selecting : %s ",err );
          callback(-1);
        }
        else {
          callback(rows.length);
        }
      });
    }
  },
  insert: {

    newUser: function( user, callback ) {
      // INSERT INTO `users` (`id`, `email`, `username`, `password`, `firstname`, `lastname`, `birthdate`, `gender`) VALUES (NULL, 'test@test', 'test', 'test', 'test', 'test', '2016-11-02', '1');
      db.query(
        'INSERT INTO users (id, email, username, password, firstname, lastname, birthdate, gender) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?)',
        [user.email, user.username, bcrypt.hashSync(user.password, 10), "", "", user.birthday, user.gender],
        function(err,rows) {
          if(err) {
            console.log("Error Selecting : %s ", err );
            callback(-1);
          }
          else
            callback(rows.length);
      });
    }
  },
  update: {

  },
  delete: {

  }
}