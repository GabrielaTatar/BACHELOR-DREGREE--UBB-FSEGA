from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from models import db, Doctori, Utilizatori, Pacienti, Nutritionisti, Psihologi, Fisa_Medicala, Planuri_Alimentare, Consultatii, Retete_Medicale, Terapii, Formular_de_prescriptie


app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:''@localhost/oncologie'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
ma = Marshmallow(app)


class DoctoriSchema(ma.Schema):
  class Meta:
    fields = ("nume", "prenume", "tip_doctor", "cabinet", "descriere", "contact", "recenzii")

doctor_schema = DoctoriSchema()
doctori_schema = DoctoriSchema(many=True)

@app.route('/doctor', methods = ['POST'])
def add_doctor():
    nume = request.json['nume']
    prenume = request.json['prenume']
    tip_doctor = request.json['tip_doctor']
    cabinet = request.json['cabinet']
    descriere = request.json['descriere']
    contact = request.json['contact']
    recenzii = request.json['recenzii']

    my_doctori = Doctori(nume, prenume, tip_doctor, cabinet, descriere, contact, recenzii)
    db.session.add(my_doctori)
    db.session.commit()
 
    return doctor_schema.jsonify(my_doctori)


@app.route('/get', methods = ['GET'])
def get_doctor():
   all_doctori = Doctori.query.all()
   result = doctori_schema.dump(all_doctori)

   return jsonify(result)


@app.route('/doctori/<id_doctor>/', methods = ['GET'])
def doctor_return(id_doctor):
   doctor = Doctori.query.get(id_doctor)
   return doctor_schema.jsonify(doctor)


mylist = Doctori

if mylist is not Doctori: 
   for x in mylist:
      print(x)

if __name__ == "__main__":
   app.run(debug=True)



