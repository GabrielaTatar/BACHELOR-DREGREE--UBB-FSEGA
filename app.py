from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from models import db, Doctori, Utilizatori, Pacienti, Nutritionisti, Psihologi, Fisa_Medicala, Planuri_Alimentare, Consultatii, Retete_Medicale, Terapii, Formular_de_prescriptie, Cadre_medicale
import uuid
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
from functools import wraps


app = Flask(__name__)


app.config['SECRET_KEY'] = 'thisissecret'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:''@localhost/oncologie'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
# ma = Marshmallow(app)


# class DoctoriSchema(ma.Schema):
#    class Meta:
#       fields = ("nume", "prenume", "tip_doctor", "cabinet", "descriere", "contact", "recenzii")

# doctor_schema = DoctoriSchema()
# doctori_schema = DoctoriSchema(many=True)

# @app.route('/doctor', methods = ['POST'])
# def add_doctor():
#    nume = request.json['nume']
#    prenume = request.json['prenume']
#    tip_doctor = request.json['tip_doctor']
#    cabinet = request.json['cabinet']
#    descriere = request.json['descriere']
#    contact = request.json['contact']
#    recenzii = request.json['recenzii']
   
#    my_doctori = Doctori(nume, prenume, tip_doctor, cabinet, descriere, contact, recenzii)
#    db.session.add(my_doctori)
#    db.session.commit()
   
#    return doctor_schema.jsonify(my_doctori)


# @app.route('/get', methods = ['GET'])
# def get_doctor():
#    all_doctori = Doctori.query.all()
#    result = doctori_schema.dump(all_doctori)

#    return jsonify(result)


# @app.route('/doctori/<id_doctor>/', methods = ['GET'])
# def doctor_return(id_doctor):
#    doctor = Doctori.query.get(id_doctor)
#    return doctor_schema.jsonify(doctor)


# mylist = Doctori

# if mylist is not Doctori: 
#    for x in mylist:
#       print(x)


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']

        if not token:
            return jsonify({'message' : 'Token is missing!'}), 401
        try:
           data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
           current_user = Utilizatori.query.filter_by(public_id=data['public_id']).first()
        except:
           return jsonify({'message' : 'Token is invalid!'}), 401
           

        return f(current_user, *args, **kwargs)

    return decorated


@app.route('/utilizatori', methods = ['POST'])
@token_required
def create_user(current_user):

   if not current_user.admin:
      return jsonify({'message' : 'Cannot perform that function!'})

   data = request.get_json()
   
   new_user = Utilizatori(nume_utilizator = data['nume_utilizator'], parola = data['parola'], email = data['email'], tip_utilizator = data['tip_utilizator'], public_id = str(uuid.uuid4()), admin = False)
   db.session.add(new_user)
   db.session.commit()
   
   return jsonify({'message' : 'New user created!'})



@app.route('/utilizatori', methods = ['GET'])
@token_required
def get_all_users(current_user):

   if not current_user.admin:
     return jsonify({'message' : 'Cannot perform that function!'})

   global Utilizatori
   users = Utilizatori.query.all()

   output = []
   
   for Utilizatori in users:
      user_data = {}
      user_data['public_id'] = Utilizatori.public_id
      user_data['nume_utilizator'] = Utilizatori.nume_utilizator
      user_data['email'] = Utilizatori.email
      user_data['tip_utilizator'] = Utilizatori.tip_utilizator
      user_data['parola'] = Utilizatori.parola
      user_data['admin'] = Utilizatori.admin
      output.append(user_data)
      
   return jsonify({'users' : output})


@app.route('/utilizatori/<public_id>', methods = ['GET'])
@token_required
def get_one_user(current_user, public_id):

   if not current_user.admin:
      return jsonify({'message' : 'Cannot perform that function!'})

   user = Utilizatori.query.filter_by(public_id = public_id).first()

   if not user:
      return jsonify({'message' : 'No user found!'})
   
   user_data = {}
   user_data['public_id'] = user.public_id
   user_data['nume_utilizator'] = user.nume_utilizator
   user_data['email'] = user.email
   user_data['tip_utilizator'] = user.tip_utilizator
   user_data['parola'] = user.parola
   user_data['admin'] = user.admin
   
   return jsonify({'user' : user_data})


@app.route('/utilizatori/<public_id>', methods = ['PUT'])
@token_required
def promote_user(current_user, public_id):

   if not current_user.admin:
      return jsonify({'message' : 'Cannot perform that function!'})

   user = Utilizatori.query.filter_by(public_id = public_id).first()

   if not user:
      return jsonify({'message' : 'No user found!'})
   
   user.admin = True
   db.session.commit()
   
   return jsonify({'message' : 'The user has been promoted!'})


@app.route('/utilizatori/<public_id>', methods = ['DELETE'])
@token_required
def delete_user(current_user, public_id):

   if not current_user.admin:
      return jsonify({'message' : 'Cannot perform that function!'})

   user = Utilizatori.query.filter_by(public_id = public_id).first()

   if not user:
      return jsonify({'message' : 'No user found!'})
   
   db.session.delete(user)
   db.session.commit()

   return jsonify({'message' : 'The user has been deleted!'})


@app.route('/login')
def login():
   auth = request.authorization

   if not auth or not auth.username or not auth.password:
      return make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})
   
   user = Utilizatori.query.filter_by(nume_utilizator=auth.username).first()

   if not user:
      return make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})
   
   if user.parola == auth.password:
      token = jwt.encode({'public_id' : user.public_id, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=30)}, app.config['SECRET_KEY'])
      
      return jsonify({'token' : token})

   return make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})
   

# HTTP METHOD

@app.route('/doctori', methods=['POST'])
@token_required
def create_doctor(current_user):

   data = request.get_json()

  # utilizator = Utilizatori.query.filter_by(id_utilizator=current_user.id_utilizator).first()

   cadru_medical = Cadre_medicale(tip_cadru_medical="doctor")

   try:
        db.session.add(cadru_medical)
        db.session.commit()
        doctor = Doctori(nume=data['nume'], prenume=data['prenume'], tip_doctor=data['tip_doctor'], cabinet=data['cabinet'], descriere=data['descriere'], contact=data['contact'], recenzii=data['recenzii'], utilizatori_id=data['utilizatori_id'], cadre_medicale_id_cadru=cadru_medical.id_cadru)

        try:
           db.session.add(doctor)
           db.session.commit()
           return jsonify({'mesaj': 'Doctor adăugat cu succes!'})
        except:
           return jsonify({'mesaj': 'Eroare la adăugarea doctorului!'}), 500
   except:
        return jsonify({'mesaj': 'Eroare la adăugarea cadrului medical!'}), 500
     

@app.route('/psihologi', methods=['POST'])
@token_required
def create_teraphist(current_user):

   data = request.get_json()

  # utilizator = Utilizatori.query.filter_by(id_utilizator=current_user.id_utilizator).first()

   cadru_medical = Cadre_medicale(tip_cadru_medical="psiholog")

  
   db.session.add(cadru_medical)
   db.session.commit()
   psiholog = Psihologi(nume=data['nume'], prenume=data['prenume'], cabinet=data['cabinet'], descriere=data['descriere'], contact=data['contact'], recenzii=data['recenzii'], utilizatori_id_utilizator=data['utilizatori_id'], cadre_medicale_id_cadru=cadru_medical.id_cadru)

        
   db.session.add(psiholog)
   db.session.commit()
   return jsonify({'mesaj': 'Psiholog adăugat cu succes!'})
        


   


   
if __name__ == "__main__":
   app.run(debug=True)



