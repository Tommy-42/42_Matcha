"use strict";
var db = require('./db.js');

module.exports = {

  select: {

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
  update: {

  },
  delete: {

  }
}