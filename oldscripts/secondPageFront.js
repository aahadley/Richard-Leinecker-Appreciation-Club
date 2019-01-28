function addContact(){
    name = document.getElementById('addName').value;
    number = document.getElementById('addNumber').value;
    email = document.getElementById('addEmail').value;
    address = document.getElementById('addAddress').value;
}

function search(){
    name = document.getElementById('searchName').value;
    number = document.getElementById('searchNumber').value;
    email = document.getElementById('searchEmail').value;
    address = document.getElementById('searchAddress').value;
}

function table() {
    var table = document.getElementById('contactTable');

    var i;
    for(i = 0; i < numContacts; i++){
        var row = table.insertRow(i);
        row.setAttribute("id","newRow");
        var info = document.createElement("p");
        var node = createTextNode(
            "Name:" + name +"\n",
            "Phone:" + number + "\n",
            "E-mail:" + email + "\n",
            "Address:" + address + "\n");
    
        info.appendChild(node);
        var element = getElementById("newRow");
        element.appendChild(info); 
        row.removeAttribute("id");   
    }
}
