from flask_cors import CORS
from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from models import db, Doctori, Utilizatori, Pacienti, Nutritionisti, Psihologi, Fisa_Medicala, Planuri_Alimentare, Consultatii, Retete_Medicale, Terapii, Formular_de_prescriptie, Cadre_medicale, Nutritie_Indicatie, Psiholog_Terapie
import uuid
import jwt
from werkzeug.security import generate_password_hash, check_password_hash

import datetime
from functools import wraps


app = Flask(__name__)
CORS(app, supports_credentials=True)

app.config['SECRET_KEY'] = 'thisissecret'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:''@localhost/oncologie'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

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
      token = jwt.encode({'public_id' : user.public_id, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=60)}, app.config['SECRET_KEY'])
      
      response = jsonify({'token' : token})
      
      # response.headers.add('Access-Control-Allow-Origin', '*')
      # response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
      # response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
      # response.headers.add('Access-Control-Allow-Credentials', 'true')
      
      return response

   return make_response('Could not verify', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})
   



# HTTP METHOD

@app.route('/doctori', methods=['POST'])
@token_required
def create_doctor(current_user):

   data = request.get_json()

   cadru_medical = Cadre_medicale(tip_cadru_medical="doctor")

   try:
        db.session.add(cadru_medical)
        db.session.commit()
        doctor = Doctori(nume=data['nume'], prenume=data['prenume'], tip_doctor=data['tip_doctor'], cabinet=data['cabinet'], descriere=data['descriere'], contact=data['contact'], recenzii=data['recenzii'], utilizatori_id_utilizator=data['utilizatori_id'], cadre_medicale_id_cadru=cadru_medical.id_cadru)

        try:
           db.session.add(doctor)
           db.session.commit()
           return jsonify({'mesaj': 'Doctor adăugat cu succes!'})
        except:
           return jsonify({'mesaj': 'Eroare la adăugarea doctorului!'}), 500
   except:
        return jsonify({'mesaj': 'Eroare la adăugarea cadrului medical!'}), 500
     

@app.route('/doctori', methods=['GET'])
def get_all_doctors():
   
   global Doctori
   
   doctors = Doctori.query.all()
   
   output = []
   
   for Doctori in doctors:
      doctors_data = {}
      doctors_data['id_doctor'] = Doctori.id_doctor
      doctors_data['nume'] = Doctori.nume
      doctors_data['prenume'] = Doctori.prenume
      doctors_data['tip_doctor'] = Doctori.tip_doctor
      doctors_data['cabinet'] = Doctori.cabinet
      doctors_data['descriere'] = Doctori.descriere
      doctors_data['contact'] = Doctori.contact
      doctors_data['recenzii'] = Doctori.recenzii
      doctors_data['utilizatori_id_utilizator'] = Doctori.utilizatori_id_utilizator
      doctors_data['cadre_medicale_id_cadru'] = Doctori.cadre_medicale_id_cadru
      output.append(doctors_data)

      
   return jsonify({'doctors' : output})


@app.route('/doctori/<id_doctor>', methods=['GET'])
@token_required
def get_one_doctors(current_user, id_doctor):
   
   global Doctori
   
   doctor = Doctori.query.filter_by(id_doctor = id_doctor).first()
   
   
   doctors_data = {}
   doctors_data['nume'] = doctor.nume
   doctors_data['prenume'] = doctor.prenume
   doctors_data['tip_doctor'] = doctor.tip_doctor
   doctors_data['cabinet'] = doctor.cabinet
   doctors_data['descriere'] = doctor.descriere
   doctors_data['contact'] = doctor.contact
   doctors_data['recenzii'] = doctor.recenzii
   doctors_data['utilizatori_id_utilizator'] = doctor.utilizatori_id_utilizator
   doctors_data['cadre_medicale_id_cadru'] = doctor.cadre_medicale_id_cadru
      
   return jsonify({'doctor' : doctors_data})

     
     
@app.route('/psihologi', methods=['POST'])
@token_required
def create_teraphists(current_user):

   data = request.get_json()

   cadru_medical = Cadre_medicale(tip_cadru_medical="psiholog")

   try:
      db.session.add(cadru_medical)
      db.session.commit()
      psiholog = Psihologi(nume=data['nume'], prenume=data['prenume'], cabinet=data['cabinet'], descriere=data['descriere'], contact=data['contact'], recenzii=data['recenzii'], utilizatori_id_utilizator=data['utilizatori_id'], cadre_medicale_id_cadru=cadru_medical.id_cadru)
     
      try:
         db.session.add(psiholog)
         db.session.commit()
         return jsonify({'mesaj': 'Psiholog adăugat cu succes!'})
      except:
         return jsonify({'mesaj': 'Eroare la adăugarea psihologului!'}), 500
   except:
        return jsonify({'mesaj': 'Eroare la adăugarea cadrului medical!'}), 500


@app.route('/psihologi', methods=['GET'])
def get_all_theraphists():
   
   global Psihologi
   
   theraphists = Psihologi.query.all()
   
   output = []
   
   for Psihologi in theraphists:
      theraphists_data = {}
      theraphists_data['id_psiholog'] = Psihologi.id_psiholog
      theraphists_data['nume'] = Psihologi.nume
      theraphists_data['prenume'] = Psihologi.prenume
      theraphists_data['cabinet'] = Psihologi.cabinet
      theraphists_data['descriere'] = Psihologi.descriere
      theraphists_data['contact'] = Psihologi.contact
      theraphists_data['recenzii'] = Psihologi.recenzii
      theraphists_data['utilizatori_id_utilizator'] = Psihologi.utilizatori_id_utilizator
      theraphists_data['cadre_medicale_id_cadru'] = Psihologi.cadre_medicale_id_cadru
      output.append(theraphists_data)

      
   return jsonify({'theraphists' : output})


@app.route('/psihologi/<id_psiholog>', methods=['GET'])
@token_required
def get_one_theraphist(current_user, id_psiholog):
   
   global Psihologi
   
   theraphist = Psihologi.query.filter_by(id_psiholog = id_psiholog).first()
   
   
   theraphist_data = {}
   theraphist_data['nume'] = theraphist.nume
   theraphist_data['prenume'] = theraphist.prenume
   theraphist_data['cabinet'] = theraphist.cabinet
   theraphist_data['descriere'] = theraphist.descriere
   theraphist_data['contact'] = theraphist.contact
   theraphist_data['recenzii'] = theraphist.recenzii
   theraphist_data['utilizatori_id_utilizator'] = theraphist.utilizatori_id_utilizator
   theraphist_data['cadre_medicale_id_cadru'] = theraphist.cadre_medicale_id_cadru
      
   return jsonify({'theraphist' : theraphist_data})



@app.route('/nutritionisti', methods=['POST'])
@token_required
def create_nutritionist(current_user):

   data = request.get_json()


   cadru_medical = Cadre_medicale(tip_cadru_medical="nutritionist")

   try:
      db.session.add(cadru_medical)
      db.session.commit()
      nutritionist = Nutritionisti(nume=data['nume'], prenume=data['prenume'], cabinet=data['cabinet'], descriere=data['descriere'], contact=data['contact'], recenzii=data['recenzii'], utilizatori_id_utilizator=data['utilizatori_id'], cadre_medicale_id_cadru=cadru_medical.id_cadru)

      try:
         db.session.add(nutritionist)
         db.session.commit()
         return jsonify({'mesaj': 'Nutritionist adăugat cu succes!'})
      except:
        return jsonify({'mesaj': 'Eroare la adăugarea nutritionistului!'}), 500
   except:
        return jsonify({'mesaj': 'Eroare la adăugarea cadrului medical!'}), 500
 


@app.route('/nutritionisti', methods=['GET'])
def get_all_nutritionists():
   
   global Nutritionisti
   
   nutritionists = Nutritionisti.query.all()
   
   output = []
   
   for Nutritionisti in nutritionists:
      nutritionists_data = {}
      nutritionists_data['id_nutritionist'] = Nutritionisti.id_nutritionist
      nutritionists_data['nume'] = Nutritionisti.nume
      nutritionists_data['prenume'] = Nutritionisti.prenume
      nutritionists_data['cabinet'] = Nutritionisti.cabinet
      nutritionists_data['descriere'] = Nutritionisti.descriere
      nutritionists_data['contact'] = Nutritionisti.contact
      nutritionists_data['recenzii'] = Nutritionisti.recenzii
      nutritionists_data['utilizatori_id_utilizator'] = Nutritionisti.utilizatori_id_utilizator
      nutritionists_data['cadre_medicale_id_cadru'] = Nutritionisti.cadre_medicale_id_cadru
      output.append(nutritionists_data)

      
   return jsonify({'nutritionisti' : output})
   

@app.route('/nutritionisti/<id_nutritionist>', methods=['GET'])
@token_required
def get_one_nutritionist(current_user, id_nutritionist):
   
   global Nutritionisti
   
   nutritionist = Nutritionisti.query.filter_by(id_nutritionist = id_nutritionist).first()
   
   
   nutritionist_data = {}
   nutritionist_data['nume'] = nutritionist.nume
   nutritionist_data['prenume'] = nutritionist.prenume
   nutritionist_data['cabinet'] = nutritionist.cabinet
   nutritionist_data['descriere'] = nutritionist.descriere
   nutritionist_data['contact'] = nutritionist.contact
   nutritionist_data['recenzii'] = nutritionist.recenzii
   nutritionist_data['utilizatori_id_utilizator'] = nutritionist.utilizatori_id_utilizator
   nutritionist_data['cadre_medicale_id_cadru'] = nutritionist.cadre_medicale_id_cadru
      
   return jsonify({'nutritionist' : nutritionist_data})
   

@app.route('/consultatii', methods=['POST'])
@token_required
def create_consultations(current_user):

   data = request.get_json()
   
   new_consultations = Consultatii(data = data['data'], simptome = data['simptome'], diagnostic = data['diagnostic'], durata = data['durata'], pret = data['pret'], schema_tratament = data['schema_tratament'], fisa_medicala_id_fisa = data['fisa_medicala_id_fisa'], cadre_medicale_id_cadru = data['cadre_medicale_id_cadru'])
   
   db.session.add(new_consultations)
   db.session.commit()
   
   return jsonify({'mesaj': 'Consultatie adăugată cu succes!'})


@app.route('/consultatii/<id_consultatie>', methods = ['PUT'])
@token_required
def update_consultation(current_user, id_consultatie):
   
   consultation = Consultatii.query.get(id_consultatie) 
   
   if not consultation:
      return jsonify({'message' : 'No consultation found!'})
   
   
   diagnostic = request.json['diagnostic']
   schema_tratament = request.json['schema_tratament']
   formular_de_prescriptie_id_formular = request.json['formular_de_prescriptie_id_formular']
   
   consultation.diagnostic = diagnostic
   consultation.schema_tratament = schema_tratament
   consultation.formular_de_prescriptie_id_formular = formular_de_prescriptie_id_formular
   
   db.session.commit()
   
   return jsonify({'message' : 'Update made by the healthcare professional!'})


@app.route('/consultatii/<fisa_medicala_id_fisa>', methods=['GET'])
@token_required
def get_one_consultation_by_fisa_medicala_id_fisa(current_user, fisa_medicala_id_fisa):
   
   global Consultatii
   
   consultation = Consultatii.query.filter_by(fisa_medicala_id_fisa = fisa_medicala_id_fisa).first()
   
   
   consultation_data = {}
   consultation_data['data'] = consultation.data
   consultation_data['simptome'] = consultation.simptome
   consultation_data['diagnostic'] = consultation.diagnostic
   consultation_data['durata'] = consultation.durata
   consultation_data['pret'] = consultation.pret
   consultation_data['schema_tratament'] = consultation.schema_tratament
   consultation_data['formular_de_prescriptie_id_formular'] = consultation.formular_de_prescriptie_id_formular
   consultation_data['fisa_medicala_id_fisa'] = consultation.fisa_medicala_id_fisa
   consultation_data['cadre_medicale_id_cadru'] = consultation.cadre_medicale_id_cadru
      
   return jsonify({'nutritionist' : consultation_data})


@app.route('/consultatii/<id_consultatie>', methods=['GET'])
@token_required
def get_one_consultation_by_id_consultatie(current_user, id_consultatie):
   
   global Consultatii
   
   consultation = Consultatii.query.filter_by(id_consultatie = id_consultatie).first()
   
   
   consultation_data = {}
   consultation_data['data'] = consultation.data
   consultation_data['simptome'] = consultation.simptome
   consultation_data['diagnostic'] = consultation.diagnostic
   consultation_data['durata'] = consultation.durata
   consultation_data['pret'] = consultation.pret
   consultation_data['schema_tratament'] = consultation.schema_tratament
   consultation_data['formular_de_prescriptie_id_formular'] = consultation.formular_de_prescriptie_id_formular
   consultation_data['fisa_medicala_id_fisa'] = consultation.fisa_medicala_id_fisa
   consultation_data['cadre_medicale_id_cadru'] = consultation.cadre_medicale_id_cadru
      
   return jsonify({'nutritionist' : consultation_data})
      

@app.route('/fisa_medicala/<id_fisa>', methods=['GET'])
@token_required
def get_one_medical_record(current_user, id_fisa):
   
   global Fisa_Medicala
   
   medical_record = Fisa_Medicala.query.filter_by(id_fisa = id_fisa).first()
   
   
   medical_record_data = {}
   medical_record_data['istoric_medical'] = medical_record.istoric_medical
   medical_record_data['observatii'] = medical_record.observatii
   medical_record_data['pacienti_id_pacient'] = medical_record.pacienti_id_pacient
      
   return jsonify({'medical_record' : medical_record_data})


@app.route('/pacienti', methods=['POST'])
def create_medical_patient():

   data = request.get_json()
   
   try:
      new_user = Utilizatori(nume_utilizator = data['nume_utilizator'], parola = data['parola'], email = data['email'], tip_utilizator = 'pacient', public_id = str(uuid.uuid4()), admin = False)
      db.session.add(new_user)
      db.session.commit()
      
      try:
         new_patient = Pacienti(nume = data['nume'], prenume = data['prenume'], CNP = data['CNP'], nr_telefon = data['nr_telefon'], email = data['email'], judet = data['judet'], localitate = data['localitate'], adresa = data['adresa'], utilizatori_id_utilizator = new_user.id_utilizator)
         print(new_patient.nume)
         db.session.add(new_patient)
         db.session.commit()
         
         print("a trecut de commit")
         token = jwt.encode({'public_id' : new_user.public_id, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=60)}, app.config['SECRET_KEY'])
         print(token)
         response = jsonify({'token' : token})
         return response
      except:
         return jsonify({'mesaj': 'Eroare la adăugarea pacientului!'})
   except: 
      return jsonify({'mesaj' : 'Eroare la adaugarea utilizatorului'})
   

@app.route('/pacienti/<id_pacient>', methods=['GET'])
@token_required
def get_one_patient(current_user, id_pacient):
   
   global Pacienti
   
   patient = Pacienti.query.filter_by(id_pacient = id_pacient).first()
   
   
   patient_data = {}
   patient_data['nume'] = patient.nume
   patient_data['prenume'] = patient.prenume
   patient_data['CNP'] = patient.CNP
   patient_data['nr_telefon'] = patient.nr_telefon
   patient_data['email'] = patient.email
   patient_data['judet'] = patient.judet
   patient_data['localitate'] = patient.localitate
   patient_data['adresa'] = patient.adresa
   patient_data['utilizatori_id_utilizator'] = patient.utilizatori_id_utilizator
      
   return jsonify({'patient' : patient_data})


@app.route('/pacientDinConsultatie/<id_consultatie>', methods=['GET'])
@token_required
def get_one_patient_by_fisa_medicala(current_user, id_consultatie):
   
   global Consultatii
   
   consultation = Consultatii.query.filter_by(id_consultatie = id_consultatie).first()
   
   medical_file = Fisa_Medicala.query.filter_by(id_fisa = consultation.fisa_medicala_id_fisa).first()
   
   patient = Pacienti.query.filter_by(id_pacient = medical_file.pacienti_id_pacient).first()
   
   
   patient_data = {}
   patient_data['nume'] = patient.nume
   patient_data['prenume'] = patient.prenume
   patient_data['CNP'] = patient.CNP
   patient_data['nr_telefon'] = patient.nr_telefon
   patient_data['email'] = patient.email
   patient_data['judet'] = patient.judet
   patient_data['localitate'] = patient.localitate
   patient_data['adresa'] = patient.adresa
   patient_data['utilizatori_id_utilizator'] = patient.utilizatori_id_utilizator
      
   return jsonify({'patient' : patient_data})


@app.route('/retete_medicale', methods=['POST'])
@token_required
def create_medical_prescriptions(current_user):

   data = request.get_json()
   
   formular_de_prescriptie = Formular_de_prescriptie(tip_formular="reteta_medicala")

   try:
      db.session.add(formular_de_prescriptie)
      db.session.commit()
      new_medical_prescriptions = Retete_Medicale(denumire_diagnostic = data['denumire_diagnostic'], medicamente = data['medicamente'], formular_de_prescriptie_id_formular = formular_de_prescriptie.id_formular, doctori_id_doctor = data['doctori_id_doctor'])

      try:
         db.session.add(new_medical_prescriptions)
         db.session.commit()
         return jsonify({'mesaj': 'Reteta medicala adăugată cu succes!', 'id_formular_reteta_medicala' : formular_de_prescriptie.id_formular})
      except:
        return jsonify({'mesaj': 'Eroare la adăugarea retetei!'}), 500
   except:
        return jsonify({'mesaj': 'Eroare la adăugarea formularului!'}), 500


@app.route('/retete_medicale/<formular_de_prescriptie_id_formular>', methods=['GET'])
@token_required
def get_one_patient_by_formular_de_prescriptie(current_user, formular_de_prescriptie_id_formular):
   
   global Retete_Medicale
   
   medical_prescriptions = Retete_Medicale.query.filter_by(formular_de_prescriptie_id_formular = formular_de_prescriptie_id_formular).first()
   
   
   medical_prescriptions_data = {}
   medical_prescriptions_data['denumire_diagnostic'] = medical_prescriptions.denumire_diagnostic
   medical_prescriptions_data['medicamente'] = medical_prescriptions.medicamente
   medical_prescriptions_data['doctori_id_doctor'] = medical_prescriptions.doctori_id_doctor
   medical_prescriptions_data['formular_de_prescriptie_id_formular'] = medical_prescriptions.formular_de_prescriptie_id_formular
      
   return jsonify({'patient' : medical_prescriptions_data})


@app.route('/nutritie_indicatie', methods=['POST'])
@token_required
def create_nutritional_indication(current_user):

   data = request.get_json() 

   formular_de_prescriptie = Formular_de_prescriptie(tip_formular="nutritie_indicatie")

   try:
      db.session.add(formular_de_prescriptie)
      db.session.commit()
      new_nutritional_indication = Nutritie_Indicatie(denumire = data['denumire'], pret = data['pret'], formular_de_prescriptie_id_formular = formular_de_prescriptie.id_formular, nutritionisti_id_nutritionist = data['nutritionisti_id_nutritionist'], planuri_alimentare_id_plan = data['planuri_alimentare_id_plan'])

      try:
         db.session.add(new_nutritional_indication)
         db.session.commit()
         return jsonify({'mesaj': 'Nutritie indicatie adăugată cu succes!', 'id_formular_nutritie_indicatie' : formular_de_prescriptie.id_formular})
      except:
        return jsonify({'mesaj': 'Eroare la adăugarea indicatiei!'}), 500
   except:
        return jsonify({'mesaj': 'Eroare la adăugarea formularului!'}), 500


@app.route('/nutritie_indicatie/<formular_de_prescriptie_id_formular>', methods=['GET'])
@token_required
def get_one_nutritional_indication_by_formular_de_prescriptie(current_user, formular_de_prescriptie_id_formular):
   
   global Nutritie_Indicatie
   
   nutritional_indication = Nutritie_Indicatie.query.filter_by(formular_de_prescriptie_id_formular = formular_de_prescriptie_id_formular).first()
   
   
   nutritional_indication_data = {}
   nutritional_indication_data['denumire'] = nutritional_indication.denumire
   nutritional_indication_data['pret'] = nutritional_indication.pret
   nutritional_indication_data['nutritionisti_id_nutritionist'] = nutritional_indication.nutritionisti_id_nutritionist
   nutritional_indication_data['formular_de_prescriptie_id_formular'] = nutritional_indication.formular_de_prescriptie_id_formular
   nutritional_indication_data['planuri_alimentare_id_plan'] = nutritional_indication.planuri_alimentare_id_plan

      
   return jsonify({'nutritional_indication' : nutritional_indication_data})


@app.route('/psiholog_terapie', methods=['POST'])
@token_required
def create_psychotherapy(current_user):

   data = request.get_json()
   
   formular_de_prescriptie = Formular_de_prescriptie(tip_formular="psiholog_terapie")

   try:
      db.session.add(formular_de_prescriptie)
      db.session.commit()
      new_psychotherapy = Psiholog_Terapie(denumire = data['denumire'], pret = data['pret'], formular_de_prescriptie_id_formular = formular_de_prescriptie.id_formular, psihologi_id_psiholog = data['psihologi_id_psiholog'], terapii_id_terapie = data['terapii_id_terapie'])

      try:
         db.session.add(new_psychotherapy)
         db.session.commit()
         return jsonify({'mesaj': 'Psiholog terapie adăugat cu succes!', 'id_formular_psiholog_terapie' : formular_de_prescriptie.id_formular})
      except:
        return jsonify({'mesaj': 'Eroare la adăugarea terapiei!'}), 500
   except:
        return jsonify({'mesaj': 'Eroare la adăugarea formularului!'}), 500


@app.route('/psiholog_terapie/<formular_de_prescriptie_id_formular>', methods=['GET'])
@token_required
def get_one_psychotherapy_by_formular_de_prescriptie(current_user, formular_de_prescriptie_id_formular):
   
   global Psiholog_Terapie
   
   psychotherapy = Psiholog_Terapie.query.filter_by(formular_de_prescriptie_id_formular = formular_de_prescriptie_id_formular).first()
   
   
   psychotherapy_data = {}
   psychotherapy_data['denumire'] = psychotherapy.denumire
   psychotherapy_data['pret'] = psychotherapy.pret
   psychotherapy_data['psihologi_id_psiholog'] = psychotherapy.psihologi_id_psiholog
   psychotherapy_data['formular_de_prescriptie_id_formular'] = psychotherapy.formular_de_prescriptie_id_formular
   psychotherapy_data['terapii_id_terapie'] = psychotherapy.terapii_id_terapie
      
   return jsonify({'psychotherapy' : psychotherapy_data})


@app.route('/planuri_alimentare/<id_plan>', methods=['GET'])
@token_required
def get_one_diet_plan(current_user, id_plan):
   
   global Planuri_Alimentare
   
   diet_plan = Planuri_Alimentare.query.filter_by(id_plan = id_plan).first()
   
   
   diet_plan_data = {}
   diet_plan_data['dieta'] = diet_plan.dieta
   diet_plan_data['ingrediente'] = diet_plan.ingrediente
   diet_plan_data['observatii'] = diet_plan.observatii
      
   return jsonify({'diet_plan' : diet_plan_data})


@app.route('/planuri_alimentare', methods=['GET'])
@token_required
def get_all_diet_plan(current_user):
   
   global Planuri_Alimentare
   
   diet_plans = Planuri_Alimentare.query.all()
   
   output = []
   
   for Planuri_Alimentare in diet_plans:
      diet_plans_data = {}
      diet_plans_data['dieta'] = Planuri_Alimentare.dieta
      diet_plans_data['ingrediente'] = Planuri_Alimentare.ingrediente
      diet_plans_data['observatii'] = Planuri_Alimentare.observatii
      output.append(diet_plans_data)

      
   return jsonify({'diet_plans' : output})


@app.route('/terapii/<id_terapie>', methods=['GET'])
@token_required
def get_one_therapy(current_user, id_terapie):
   
   global Terapii
   
   therapy = Terapii.query.filter_by(id_terapie = id_terapie).first()
   
   
   therapy_data = {}
   therapy_data['tip_terapie'] = therapy.tip_terapie
   therapy_data['durata'] = therapy.durata
   therapy_data['observatii'] = therapy.observatii
      
   return jsonify({'therapy' : therapy_data})


@app.route('/terapii', methods=['GET'])
@token_required
def get_all_therapies(current_user):
   
   global Terapii
   
   therapies = Terapii.query.all()
   
   output = []
   
   for Terapii in therapies:
      therapies_data = {}
      therapies_data['tip_terapie'] = Terapii.tip_terapie
      therapies_data['durata'] = Terapii.durata
      therapies_data['observatii'] = Terapii.observatii
      output.append(therapies_data)

      
   return jsonify({'therapies' : output})

   
if __name__ == "__main__":
   app.run(debug=True)



