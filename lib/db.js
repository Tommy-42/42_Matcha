var mysql = require('mysql');
var db;

function dbcon() {
  if( !db ) {
    db = mysql.createConnection({
      host: 'localhost',
      user: 'matcha',
      password : 'matcha',
      port : 3307, //port mysql
      database:'matcha'
    });
    db.connect(function(err) {
      if( err )
        console.log("Error connection database !" + err);
    });
  }
  return db;
}
module.exports = dbcon();
