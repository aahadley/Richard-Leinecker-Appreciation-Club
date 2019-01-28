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
  console.log("Register User Command connected to the database!");
  
  var newUser = "xXxTestUserxXx";		         //new Username
  var newEmail = "AAAAAAAAA@gmail.com";			 //new Email
  var newPW = "password123";			           //new Password
  
  var sql = "INSERT INTO user (username, password, email) VALUES (\'"+newUser+"\',\'"+newPW+"\',\'"+newEmail+"\')";
  
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted, ID: " + result.insertId);
  });
});
