//INCOMPLETE
//Currently enters in dummy information
//Once information can be taken from the website, edit the "new" variables
//With the appropriate information 

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "contactm.cm0a6cdoupkr.us-east-1.rds.amazonaws.com",
  user: "masterUsername",
  password: "highlySecurePassword",
  database: "contactm"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  
  var newUser = "xXxTestUserxXx";		//new Username
  var newName = "AAAAAAAAA";			//new Name
  var newPW = "password123";			//new Password
  
  var sql = "INSERT INTO user (username, name, password) VALUES (\'"+newUser+"\',\'"+newName+"\',\'"+newPW+"\')";
  
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted, ID: " + result.insertId);
  });
});