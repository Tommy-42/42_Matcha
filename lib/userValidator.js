"use strict";
var moment = require('moment');

module.exports = {

  isValidEmail: function( email ) {

    var error = []

    if( email.length == 0 || email == "" )
      error.push("Error Empty Email");
    else { 
      if( !/[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(email) )
        error.push("Email must be something like abc@rst.xyz");
    }
    return ( (error.length > 0 ? error : null) );
  },
  isValidPassword: function( password ) {

    var illegalChars = /\W/;
    var error = [];
    if( password.length < 3 )
      error.push("The password is too short (3 chars min).");
    else if ( password.length > 20 )
      error.push("The password is too long (20 chars max).");
    if ( illegalChars.test(password) )
      error.push("The Password can only contains '-', '_', alpha-num.");
    return ( (error.length > 0 ? error : null) );
  },
  isSamePassword: function( pass, confirm ) {

    if( pass != confirm )
      return false;
    return true;
  },
  isValidUsername: function( username ) {

    var illegalChars = /\W/;
    var legalChars = /([-]|[_])/g;
    var tmp = username.replace(legalChars, '');
    var error = [];

    if( typeof tmp == "undefined" ) {
      error.push("Incorrect Username")
      return ( (error.length > 0 ? error : null) );
    }
    if( tmp.length < 3 )
      error.push("The Username is too short (3 chars min).");
    else if ( tmp.length > 20 )
      error.push("The Username is too long (20 chars max).");
    if ( illegalChars.test(tmp) )
      error.push("The Username can only contains '-', '_', alpha-num.");
    return ( (error.length > 0 ? error : null) );
  },
  isValidBirthdate: function( date ) {

    var error = [];

    // take today's date and substract 18 years
    var dinosaure = moment().subtract(142, 'years').format('YYYY-MM-DD');
    var legal = moment().subtract(18, 'years').format('YYYY-MM-DD');

    if( typeof date == "undefined" ) {
      error.push("Invalide date.");
      return ( (error.length > 0 ? error : null) );
    }
    if( moment(date, 'YYYY-MM-DD', true).isValid() === false )
      error.push("Invalide Date.");
    else if( moment(date, 'YYYY-MM-DD').isAfter(legal) )
      error.push("You must reach 18 to sign up.")
    else if( moment(dinosaure, 'YYYY-MM-DD').isAfter(moment(date, 'YYYY-MM-DD')) && !moment(date, 'YYYY-MM-DD').isAfter(legal) )
      error.push("Are you Imortal ?")
    return ( (error.length > 0 ? error : null) );
  }
}