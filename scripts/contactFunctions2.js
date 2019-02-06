var un = localStorage.getItem("localLogin");
console.log("Currently logged in as: "+un);

//function to display the information of the contact(s)
//that are returned from getContacts()
function displayContact(){
	//console.log("displayContact() running");

	$("#contactDisplay").find('tbody').html("");

	var cName = document.getElementById("contactName").value;
	console.log("cName: "+cName);
	var cEmail = document.getElementById("contactEmail").value;
	var cPhone = document.getElementById("contactPhone").value;
	var cAddress = document.getElementById("contactAddress").value;

	var cont = getContacts(un,cName,cEmail,cPhone,cAddress);
	console.log("cont:\n"+cont);

	var i = 0;
	while(cont.length >= i+1){
		//$("#contactDisplay").find('tbody').append($('<tr><th>'+ cont[i][1] +'</th><td>'+cont[i][2] +'</td><td>'+cont[i][3] +'</td><td>'+cont[i][4] +'</td></tr>'));
		$("#contactDisplay").find('tbody').append($('<tr><th>'+ cont[i][1] +'</th><td>'+cont[i][2] +'</td><td>'+cont[i][3] +'</td><td>'+cont[i][4] +'</td><td><button id=del'+cont[i][0]+' onclick="deleteContact(); displayContact()"></button></td></tr>'));

		i++;
	}

	$("#contactName,#contactEmail,#contactPhone,#contactAddress").val("");

		
}


//If contact is not found, returns an empty array
function getContacts(un, cName, cEmail, cPhone, cAddress){
	console.log("getContacts running");

	var obj = {
   		contactName: cName,
   		emailAddress: cEmail,
   		phoneNumber: cPhone,
   		address: cAddress,
   		username: un
	};
	var  jsonPayload = JSON.stringify(obj);

    var xhr = new XMLHttpRequest();
	xhr.open("POST","http://iburch.pythonanywhere.com/contactsget", false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try{
		xhr.send(jsonPayload);
		var jsonObject = JSON.parse(xhr.responseText);

		//console.log(jsonObject);
		return jsonObject;
	}
	catch(err){
		console.log(err);
	}
}



function addContacts(){
	var cName = document.getElementById("newContactName").value;
	var cPhone = document.getElementById("newContactPhone").value;
	var cEmail = document.getElementById("newContactEmail").value;
	var cAddress = document.getElementById("newContactAddress").value;

    var obj = {
   		contactName: cName,
   		emailAddress: cEmail,
   		phoneNumber: cPhone,
   		address: cAddress,
   		username: un
	};
	var  jsonPayload = JSON.stringify(obj);

    var xhr = new XMLHttpRequest();
	xhr.open("POST","http://iburch.pythonanywhere.com/contactsadd", false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try{
		xhr.send(jsonPayload);
		//var jsonObject = JSON.parse(xhr.responseText);
		//console.log(jsonObject);
		console.log("addContacts responseText:\n\n"+xhr.responseText);
	}
	catch(err){
		console.log(err);
	}

	//$("#newContactName,#newContactPhone,#newContactEmail,#newContactAddress").val("");
}



function deleteContact(){
	console.log("cID: "+deleteContact.caller.arguments[0].target.id.substring(3));
	var obj = {
   		username: un,
   		contactID: deleteContact.caller.arguments[0].target.id.substring(3)
	};
	var  jsonPayload = JSON.stringify(obj);

    var xhr = new XMLHttpRequest();
	xhr.open("POST","http://iburch.pythonanywhere.com/contactsdel", false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try{
		xhr.send(jsonPayload);
		var jsonObject = JSON.parse(xhr.responseText);
		console.log(jsonObject);
	}
	catch(err){
		console.log(err);
	}
}