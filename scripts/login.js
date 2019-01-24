var mysql = require('mysql');

var con = mysql.createConnection({
  host: "contactm.cm0a6cdoupkr.us-east-1.rds.amazonaws.com",
  user: "masterUsername",
  password: "highlySecurePassword",
  database: "contactm"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Login Command connected to the database!");

  //TODO: change these to user input from html doc
  var un = "xXxTestUserxXx";
  var pw = "password123";

  var sql = "SELECT * FROM user WHERE username = \'"+un+"\'";

  con.query(sql, function (err, result) {
    if (err) throw err;
    
    //if result is empty, the username was not found
    if(result[0] == undefined){
      console.log("Username not found");
      return 0;
    }

    //invalid login
    if (un != result[0].username && pw != result[0].password){
      console.log("Invalid username or password.");
      return 0;
    }
    else{
      console.log("Login successful!");
      //window.localStorage.setItem("currentlyLoggedInAs", result[0].username);
      //localstorage may or may not work in an actual html environment
      return 1;
    }

  });
});
