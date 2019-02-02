/*
PLEASE READ		PLEASE READ		PLEASE READ		PLEASE READ		PLEASE READ		PLEASE READ		

To properly get the results from getContacts() it MUST be called from an asyncronous function
The following code is an example function to show you how to do this:

async function testFunction(){
	var result = await getContacts("username", "contactName", "contactEmail", "contactPhone", "contactAddress");
	//code to use the results from getContacts must be inside this function
	//results WILL NOT properly work if returned out of this function
	//except maybe if it is to another async function that awaited this function
}

Also, if a field is empty, i assumed the input was an empty string
*/

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "contactm.cm0a6cdoupkr.us-east-1.rds.amazonaws.com",
  user: "masterUsername",
  password: "highlySecurePassword",
  database: "contactm"
});

//getContacts() requires a proper username inorder to function
//function also assumes an empty textfield is treated as an empty string
function getContactsHelper(un, cName, cEmail, cPhone, cAddress){
	return new Promise(function(resolve, reject){
		var sql = "SELECT * FROM contacts WHERE username = \'"+un+"\'";
		if (cName != "")
			sql += " AND contactName = \'"+cName+"\'";
		if (cEmail != "")
			sql += " AND emailAddress = \'"+cEmail+"\'";
		if (cPhone != "")
			sql += " AND phoneNumber = \'"+cPhone+"\'";
		if (cAddress != "")
			sql += " AND address = \'"+cAddress+"\'";

		con.query(sql, function(err, result){
			if (result === undefined)
				reject(new Error ("Error result is undefined"));
			else
				resolve(result);
		});
	});
}

//function to display the information of the contact(s)
//that are returned from getContacts()
function displayContact(){

	var un = "";
	var cName = document.getElementById("contactName").value;
	var cEmail = document.getElementById("contactEmail").value;
	var cPhone = document.getElementById("contactPhone").value;
	var cAddress = document.getElementById("contactAddress").value;

	var cont = getContacts(un,cName,cEmail,cPhone,cAddress);
	
	$("#contactDisplay").find('tbody').append($('<tr><th>'+ cont[0] +'</th><td>'+cont[1]+'</td><td>'+cont[2]+'</td><td>'+cont[3]+'</td></tr>'));
		
}


//If contact is not found, returns an empty array
async function getContacts(un, cName, cEmail, cPhone, cAddress){
	var result = await getContactsHelper(un, cName, cEmail, cPhone, cAddress);
	//console.log(result);
	return result;
}

/*
//The following test function gets all contacts of demoUser that live in "address 1"

async function testFunction(){
	var result = await getContacts("demoUser", "", "", "", "address 1");
	console.log(result);
}
testFunction();
*/



function addContacts(){

	var un = "";
	var cName = document.getElementById("newContactName").value;
	var cPhone = document.getElementById("newContactPhone").value;
	var cEmail = document.getElementById("newContactEmail").value;
	var cAddress = document.getElementById("newContactAddress").value;

    con.connect(function(err) {
        if (err) throw err;

        var sql = "INSERT INTO contacts (contactName, emailAddress, phoneNumber, address, username) \
        VALUES (\'"+cName+"\',\'"+cEmail+"\',\'"+cPhone+"\',\'"+cAddress+"\',\'"+un+"\')";
        
        con.query(sql, function (err, result) {
	        if (err) throw err;
	        console.log("1 record inserted, ID: " + result.insertId);
        });
    });
}
//addContacts("demoUser","BBB","BBB@hotmail.com","BBB-BBB-BBBB","BBB lane");



function deleteContact(un, cID){
	con.connect(function(err) {
        if (err) throw err;

        var sql = "DELETE FROM contacts WHERE username = \'"+un+"\' AND contactID = \'"+cID+"\'";
        
        con.query(sql, function (err, result) {
	        if (err) throw err;
	        console.log("1 record deleted");
        });
    });
}
//deleteContact("demoUser","1006");