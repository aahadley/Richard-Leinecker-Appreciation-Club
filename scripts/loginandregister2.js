function register(){
    var newUser = document.getElementById("newUserID").value;
    var newEmail = document.getElementById("newUserEmail").value;
    var newPW = document.getElementById("newUserPass").value;

    var obj = {
    	username: newUser,
    	password: newPW,
    	email: newEmail
    };

    var jsonPayload = JSON.stringify(obj);

    var xhr = new XMLHttpRequest();
	xhr.open("POST","http://iburch.pythonanywhere.com/register", false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try{
		xhr.send(jsonPayload)
		console.log("responseText: "+xhr.responseText);
		var jsonObject = JSON.parse(xhr.responseText);
		console.log(jsonObject);

		localStorage.setItem("localLogin", newUser);
	    window.open("./contactsPage.html");
	}
	catch(err){
		console.log(err);
	}
}

function login(){
    var un = document.getElementById("userID").value;
    var pw = document.getElementById("userPass").value;

	var obj = {
   		username: un,
   		password: pw
   	};
   	var  jsonPayload = JSON.stringify(obj);

   	//var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var xhr = new XMLHttpRequest();
	xhr.open("POST","http://iburch.pythonanywhere.com/login", false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try{
		xhr.send(jsonPayload)
		console.log("responseText: "+xhr.responseText);
		var jsonObject = JSON.parse(xhr.responseText);
		console.log(jsonObject);

		localStorage.setItem("localLogin", un);
	    window.open("./contactsPage.html");
	}
	catch(err){
		console.log(err);
	}
}
//login();