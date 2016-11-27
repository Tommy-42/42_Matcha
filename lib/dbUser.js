"use strict";
var db = require('./db.js');
var bcrypt = require('bcryptjs');

module.exports = {

  select: {

    validAccount: function( creds ) {
      db.query('SELECT * FROM users WHERE email = ? AND password = ?', [creds.email, bcrypt.hashSync(creds.password, 10)], function(err, rows) {
        if(err) {
          console.log("Error Selecting : %s ",err );
          return -1;
        }
        else
          return rows.length == 1 ? 1 : 0;
      });
    },
    emailExist: function( username ) {
      db.query('SELECT * FROM users WHERE email = ?',[username], function(err,rows) {
        if(err) {
          console.log("Error Selecting : %s ",err );
          return -1;
        }
        else
          return rows.length == 1 ? 1 : 0;
      });
    }
  },
  insert: {

    newUser: function( user ) {
      // INSERT INTO `users` (`id`, `email`, `username`, `password`, `firstname`, `lastname`, `birthdate`, `gender`) VALUES (NULL, 'test@test', 'test', 'test', 'test', 'test', '2016-11-02', '1');
      db.query(
        'INSERT INTO users (id, email, username, password, firstname, lastname, birthdate, gender) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?)',
        [user.email, user.username, bcrypt.hashSync(user.password, 10), "", "", user.birthday, user.gender],
        function(err,rows) {
          if(err) {
            console.log("Error Selecting : %s ", err );
            return -1;
          }
          else
            return rows.length == 1 ? 1 : 0;
      });
    }
  },
  update: {

  },
  delete: {

  }
}