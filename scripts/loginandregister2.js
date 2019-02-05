function register(){
    var newUser = document.getElementById("newUserID").value;
    var newEmail = document.getElementById("newUserEmail").value;
    var newPW = document.getElementById("newUserPass").value;

    var obj = {
    	username: newUser,
    	password: newPW,
    	email: newEmail
    };

    var jsonPayload = obj.stringify();

    var xhr = new XMLHttpRequest();
	xhr.open("POST","http://localhost:5000/user", true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try{
		xhr.send(jsonPayload)
		var jsonObject = JSON.parse(xhr.responseText);
		console.log(jsonObject);
	}
	catch(err){
		console.log(err)
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
	xhr.open("POST","localhost:5000/login", false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try{
		xhr.send(jsonPayload)
		var jsonObject = JSON.parse(xhr.responseText);
		console.log(jsonObject);

		localStorage.setItem("localLogin", un);
	    window.location.assign("contactsPage.html");
	}
	catch(err){
		console.log(err);
	}
}
//login();