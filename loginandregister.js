var mysql = require('mysql');

var con = mysql.createConnection({
  host: "contactm.cm0a6cdoupkr.us-east-1.rds.amazonaws.com",
  user: "masterUsername",
  password: "highlySecurePassword",
  database: "contactm"
});

function login(){
    var un = document.getElementById("userID").value;
    var pw = document.getElementById("userPass").value;

    con.connect(function(err) {
    if (err) throw err;
    console.log("Login Command connected to the database!");

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
}

function register(){
    var newUser = document.getElementById("newUserID").value;
    var newEmail = document.getElementById("newUserEmail").value;
    var newPW = document.getElementById("newUserPass").value;

    con.connect(function(err) {
        if (err) throw err;
        console.log("Register User Command connected to the database!");
        
        var sql = "INSERT INTO user (username, password, email) VALUES (\'"+newUser+"\',\'"+newPW+"\',\'"+newEmail+"\')";
        
        con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted, ID: " + result.insertId);
        });
    });
}