from flask import Flask, request, jsonify
import pymysql as sql
#from flask_restful import Api, Resource, reqparse

app = Flask(__name__)
db = sql.connect( "contactm.cm0a6cdoupkr.us-east-1.rds.amazonaws.com" , "masterUsername", "highlySecurePassword")
cursor = db.cursor()
cursor.execute("SELECT VERSION()")
data = cursor.fetchone()
print ("Database version : %s " % data)

'''
class User():
    #id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True)
    email = db.Column(db.String(120), unique=True)

    def __init__(self, username, password, email):
        self.username = username
        self.password = password
        self.email = email
        '''

# register
@app.route('/user', methods=['POST'])
def add_user():

    username = request.json['username']
    password = request.json['password']
    email    = request.json['email']

    #usr = User(username, password, email)
    query = "INSERT INTO contactm.user (username, password, email) VALUES (\'"+username+"\',\'"+password+"\',\'"+email+"\')"

    # db.session.add(usr)
    # db.session.commit()

    cursor.execute(query)


    return jsonify({"success": True})

if __name__ == "__main__":
    app.run(debug = True)