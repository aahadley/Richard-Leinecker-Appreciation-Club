from flask import Flask, request, jsonify
import pymysql as sql
#from flask_restful import Api, Resource, reqparse

app = Flask(__name__)
db = sql.connect( "contactm.cm0a6cdoupkr.us-east-1.rds.amazonaws.com" , "masterUsername", "highlySecurePassword")
cursor = db.cursor()
cursor.execute("SELECT VERSION()")
data = cursor.fetchone()

print ("Database version : %s " % data)


# ============= USERS =============

# register user
@app.route('/register', methods=["POST"])
def add_user():

    username = request.json["username"]
    password = request.json["password"]
    email    = request.json["email"   ]

    query = "INSERT INTO contactm.user (username, password, email) VALUES (\'"+username+"\',\'"+password+"\',\'"+email+"\')"
    
    cursor.execute(query)
    db.commit()
    db.close()

    return jsonify({"success": True})


# login
@app.route("/login", methods=["POST"])
def login():

    username = request.json["username"]
    password = request.json["password"]

    query = "SELECT * FROM contactm.user WHERE username = \'"+username+"\'"

    cursor.execute(query)
    return jsonify({"TODO" : "garbage"})

# ============= CONTACTS ==============

# add contact
@app.route("/contactsadd", methods=["POST"])
def add_contact():

    name     = request.json["contactName" ]
    email    = request.json["emailAddress"] #CLARIFY THIS DISTICTION
    phone    = request.json["phoneNumber" ]
    address  = request.json["address"     ] #CLARIFY THIS DISTICTION
    username = request.json["username"    ]

    query = "INSERT INTO contactm.contacts (contactName, emailAddress, phoneNumber, address, username) VALUES \
        (\'"+name+"\',\'"+email+"\',\'"+phone+"\',\'"+address+"\',\'"+username+"\')"
            
    cursor.execute(query)
    db.commit()
    db.close()        

    return jsonify({"success": True}, {"easteregg" : "<3 Leinecker <3"})



# get contacts
@app.route("/contactsget", methods=["POST"])
def get_contacts():
    
    name     = request.json["contactName" ]
    email    = request.json["emailAddress"] #CLARIFY THIS DISTICTION
    phone    = request.json["phoneNumber" ]
    address  = request.json["address"     ] #CLARIFY THIS DISTICTION
    username = request.json["username"    ]

    if not username or username == "":  #failure
        return jsonify({"success" : False}, {"msg" : "Invalid username"})

    # base SQL command
    query = "SELECT * FROM contactm.contacts WHERE username = \'"+username+"\'"
    
    # Optional parameters
    if name and name != "":
        query += " AND contactName = \'"+name+"\'"
        #print("\n\n" + query + "\n\n")
    
    if email and email != "":
        query += " AND emailAddress = \'"+email+"\'"


    if phone and phone != "":
        query += " AND phoneNumber = \'"+phone+"\'"


    if address and address != "":
        query += " AND address = \'"+address+"\'"

    
    cursor.execute(query)
    db.close()

    return jsonify(cursor.fetchall())


# delete contact
@app.route("/contactsdel", methods=["POST"])
def delete_contact():

    username = request.json["username"]
    clientID = request.json["contactID"]

    query = "DELETE FROM contactm.contacts WHERE username = \'"+username+"\' AND contactID = \'"+clientID+"\'"
    
    cursor.execute(query)
    db.commit()
    db.close()

    return jsonify({"success" : True})


if __name__ == "__main__":
    app.run(debug = True)