"use strict";
var db = require('./db.js');
var bcrypt = require('bcryptjs');
var randomstring = require("randomstring");

module.exports = {

  select: {

    validAccount: function( creds, callback ) {
      db.query('SELECT * FROM users WHERE email = ?', [creds.email], function(err, rows) {
        if(err) {
          console.log("Error Selecting vA: %s ",err );
          callback(-1);
        }
        else {
          if( rows.length === 1 ) {
            if( bcrypt.compareSync(creds.password, rows[0].password) )
              if( rows[0].email_validated )
                callback(rows);
              else
                callback("You first need to validate your email")
            else
              callback("Invalid Email or Password");
          }
          else
            callback("No account registered with this email");
        }
      });
    },
    emailExist: function( email, callback ) {
      db.query('SELECT * FROM users WHERE email = ?',[email], function(err,rows) {
        if(err) {
          console.log("Error Selecting eE: %s ",err );
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

      // Create token email hash
      var token_email = randomstring.generate(60);

      // (`id`, `email`, `username`, `password`, `firstname`, `lastname`, `birthdate`, `gender`, `email_validated`, `token_email`, `token_password`)
      // (NULL, 'test@test', 'test', bCryptHash, 'test', 'test', '2016-11-02', '0', '0', bCryptHash, NULL)
      db.query(
        'INSERT INTO users (id, email, username, password, firstname, lastname, birthdate, gender, email_validated, token_email, token_password) \
         VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, NULL)',
        [user.email, user.username, bcrypt.hashSync(user.password, 10), "", "", user.birthday, user.gender, 0, token_email],
        function(err,rows) {
          if(err) {
            console.log("Error Inserting : %s ", err );
            callback(-1);
          }
          else
            callback(rows.length);
      });
    }
  },
  update: {

    validateEmail: function( data, callback ) {

      console.log("DATA: ");
      console.log(data);

      db.query('SELECT id FROM users WHERE token_email = ?', [data], function(err, rows) {
          if(err) {
            console.log("Error Selecting vA: %s ",err );
            callback(-1);
          }
          else {
            console.log(rows);
            if( rows.length === 1 ) {
              db.query('UPDATE users SET email_validated = ?, token_email = NULL WHERE users.id = ?;', [1, rows[0].id], function(err, upd) {
                callback(upd);
              });
            }
            else
              callback("Token not found or expired");
          }
      });
    }
  },
  delete: {

  }
}