// userValidation.js
// ========
module.exports = {

  newInput: function ( obj, req, res, next ) {
    switch(obj.name) {
      case "username":

        var error = checkUsername(obj.value);

        if( error.length ) {
          res.send('users/new', {
            error: error,
            authorized: req.checkAuth,
          });
        }
        req.getConnection(function(err,connection){
          connection.query('SELECT * FROM users WHERE username = ?',[obj.value],function(err,rows) {
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
        return;
      case "birthday":
        console.log("birthday");
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
  var error = [];

  if( username.length < 3 )
    error.push("The Username is too short (3 chars min)");
  if( illegalChars.test(username) )
    error.push("The Username can only contains '-', '_', alpha-num");
  return error;
}