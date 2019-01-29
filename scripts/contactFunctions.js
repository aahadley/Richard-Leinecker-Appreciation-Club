//TODO: None of this actually works rn

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "contactm.cm0a6cdoupkr.us-east-1.rds.amazonaws.com",
  user: "masterUsername",
  password: "highlySecurePassword",
  database: "contactm"
});

function getContacts(un){
    con.connect(function(err) {
    if (err) throw err;
    console.log("getContacts connected to the database!");

    var sql = "SELECT * FROM contacts WHERE username = \'"+un+"\'";

    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
    	});
    });
}

function searchContacts(un, cName, cPhone, cEmail, cAddress){
	con.connect(function(err) {
    if (err) throw err;
    console.log("getContacts connected to the database!");

    var sql = "SELECT * FROM contacts WHERE username = \'"+un+"\'";

    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
    	});
    });
}