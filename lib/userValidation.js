// userValidation.js
// ========

var moment = require('moment');

module.exports = {

  newInput: function ( obj, req, res, next ) {
    console.log(obj);
    switch(obj.name) {
      case "username":
        var error = checkUsername(obj.value);

        if( error.length ) {
          res.status(200).send({
            error: error,
            authorized: req.checkAuth,
          });
          return;
        }
        req.getConnection(function(err,connection){
          connection.query('SELECT * FROM users WHERE username = ?',[obj.value],function(err,rows) {
            if(err)
              console.log("Error Selecting : %s ",err );
            else {
              error = rows.length == 1 ? true : false;
              if( error ) {
                res.status(200).send({
                  authorized: req.checkAuth,
                  error: ["The Username is already taken<br>"]
                });
              }
              else
                res.status(200).send({ error: error, authorized: req.checkAuth });
            }
          });
        });
        return;
      case "email":
        var error = checkEmail(obj.value);
        if( error.length ) {
          res.status(200).send({
            error: error,
            authorized: req.checkAuth,
          });
          return;
        }
        req.getConnection(function(err,connection){
          connection.query('SELECT * FROM users WHERE email LIKE ?',[obj.value],function(err,rows) {
            if(err)
              console.log("Error Selecting : %s ",err );
            else {
              error = rows.length == 1 ? true : false;
              if( error ) {
                res.status(200).send({
                  authorized: req.checkAuth,
                  error: ["The email is already taken<br>"]
                });
              }
              else
                res.status(200).send({ error: error, authorized: req.checkAuth });
            }
          });
        });
        return;
      case "birthday":
        var error = checkDate(obj.value);
        res.status(200).send({
          error: error,
          authorized: req.checkAuth,
        });
        return;
      case "gender":
        var gender = parseInt(obj.value);
        if( gender !== 0 && gender !== 1 ) {
          res.status(200).send({
            authorized: req.checkAuth,
            error: ["Bad Gender should be Male or Female<br>"]
          });
        }
        return;
      case "password":
        console.log("password");
        return;
      case "password":
        console.log("password");
        return;
      default:
          return false;
    } 
    return false;
  }
};

function checkUsername(username) {

  var illegalChars = /\W/;
  var legalChars = /([-]|[_])/g;
  var tmp = username.replace(legalChars, '');
  console.log(tmp);
  var error = [];

  if( typeof tmp == "undefined" ) {
    error.push("Incorrect Username")
    return error;
  }
  if( tmp.length < 3 )
    error.push("The Username is too short (3 chars min).");
  else if ( tmp.length > 20 )
    error.push("The Username is too long (20 chars max).");
  if ( illegalChars.test(tmp) )
    error.push("The Username can only contains '-', '_', alpha-num.");
  return error;
}
function checkDate(date) {

  var error = [];
  // take today's date and substract 18 years
  var dinosaure = moment().subtract(142, 'years').format('YYYY-MM-DD');
  var legal = moment().subtract(18, 'years').format('YYYY-MM-DD');

  if( typeof date == "undefined" ) {
    error.push("Invalide date.");
    return error;
  }
  if( moment(date, 'YYYY-MM-DD', true).isValid() === false )
    error.push("Invalide Date.");
  else if( moment(date, 'YYYY-MM-DD').isAfter(legal) )
    error.push("You must reach 18 to sign up.")
  else if( moment(dinosaure, 'YYYY-MM-DD').isAfter(moment(date, 'YYYY-MM-DD')) && !moment(date, 'YYYY-MM-DD').isAfter(legal) )
    error.push("Are you Imortal ?")
  return error;
}
function checkPassword(password) {

  var error = [];
  var tmp = tmp;

  if( typeof password == "undefined" ) {
    error.push("Incorrect Username")
    return error;
  }
  if( password.length < 3 )
    error.push("The password is too short (3 chars min).");
  else if ( password.length > 20 )
    error.push("The password is too long (20 chars max).");
  if ( illegalChars.test(password) )
    error.push("The Password can only contains '-', '_', alpha-num.");
  return error;
}
function checkEmail(email) {

  var error = [];
  var regex = /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

  if( email.length == 0) {
    console.log(email.length);
    error.push("Email can't be empty");
    console.log("return");
  }
  else if( !regex.test(email) )
    error.push("Bad Email");

  return error;
}




