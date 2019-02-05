var un = localStorage.getItem("localLogin");

//function to display the information of the contact(s)
//that are returned from getContacts()
function displayContact(){

	$("#contactDisplay").find('tbody').html("");

	var cName = document.getElementById("contactName").value;
	var cEmail = document.getElementById("contactEmail").value;
	var cPhone = document.getElementById("contactPhone").value;
	var cAddress = document.getElementById("contactAddress").value;

	var cont = getContacts(un,cName,cEmail,cPhone,cAddress);
	
	$("#contactDisplay").find('tbody').append($('<tr><th>'+ cont[0].contactName +'</th><td>'+cont[0].phoneNumber +'</td><td>'+cont[0].emailAddress +'</td><td>'+cont[0].address +'</td></tr>'));

	var i = 1;
	while(cont.length > i+1){
		$("#contactDisplay").find('tbody').append($('<tr><th>'+ cont[i].contactName +'</th><td>'+cont[i].phoneNumber +'</td><td>'+cont[i].emailAddress +'</td><td>'+cont[i].address +'</td></tr>'));
		i++;
	}

	$("#contactName,#contactEmail,#contactPhone,#contactAddress").val("");

		
}


//If contact is not found, returns an empty array
function getContacts(un, cName, cEmail, cPhone, cAddress){
	var obj = {
   		contactName: cName,
   		contactAddress: cAddress,
   		phoneNumber: cPhone,
   		address: cAddress,
   		username: un
	};
	var  jsonPayload = obj.stringify();

    var xhr = new XMLHttpRequest();
	xhr.open("POST","http://localhost:5000/get", false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try{
		xhr.send(jsonPayload)
		var jsonObject = JSON.parse(xhr.responseText);
		console.log(jsonObject);
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
   		contactAddress: cAddress,
   		phoneNumber: cPhone,
   		address: cAddress,
   		username: un
	};
	var  jsonPayload = obj.stringify();

    var xhr = new XMLHttpRequest();
	xhr.open("POST","http://localhost:5000/contactsadd", false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try{
		xhr.send(jsonPayload)
		var jsonObject = JSON.parse(xhr.responseText);
		console.log(jsonObject);
	}
	catch(err){
		console.log(err);
	}

	$("#newContactName,#newContactPhone,#newContactEmail,#newContactAddress").val("");
}



function deleteContact(un, cID){
	var obj = {
   		username: un,
   		clientID: cID
	};
	var  jsonPayload = obj.stringify();

    var xhr = new XMLHttpRequest();
	xhr.open("POST","http://localhost:5000/contactsdel", false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	try{
		xhr.send(jsonPayload)
		var jsonObject = JSON.parse(xhr.responseText);
		console.log(jsonObject);
	}
	catch(err){
		console.log(err);
	}
}