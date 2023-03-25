from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from datetime import date

# Create a Flask instance
app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:''@localhost/oncologie'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Utilizatori(db.Model):
  __tablename__ = 'utilizatori'

  id_utilizator = db.Column(db.Integer, primary_key = True)
  nume_utilizator = db.Column(db.String(50), nullable = False)
  parola = db.Column(db.String(50), nullable = False)
  email = db.Column(db.String(50), nullable = False)
  tip_utilizator = db.Column(db.String(50), nullable = False)
  
  def __init__(self, nume_utilizator, parola, email, tip_utilizator):
    self.nume_utilizator = nume_utilizator
    self.parola = parola
    self.email = email
    self.tip_utilizator = tip_utilizator


class Pacienti(db.Model):
  __tablename__ = 'pacienti'

  id_pacient = db.Column(db.Integer, primary_key = True)
  nume = db.Column(db.String(50), nullable = False)
  prenume = db.Column(db.String(50), nullable = False)
  CNP = db.Column(db.Integer, nullable = False)
  nr_telefon = db.Column(db.Integer, nullable = False, unique = True)
  email = db.Column(db.String(50), nullable = False, unique = True)
  judet = db.Column(db.String(100), nullable = False)
  localitate = db.Column(db.String(100), nullable = False)
  adresa = db.Column(db.String(200), nullable = False)

  def __init__(self, nume, prenume, CNP, nr_telefon, email, judet, localitate, adresa):
    self.nume = nume
    self.prenume = prenume
    self.CNP = CNP
    self.nr_telefon = nr_telefon
    self.email = email
    self.judet = judet
    self.localitate = localitate
    self.adresa = adresa


class Nutritionisti(db.Model):
  __tablename__ = 'nutritionisti'

  id_nutritionist = db.Column(db.Integer, primary_key = True)
  nume = db.Column(db.String(50), nullable = False)
  prenume = db.Column(db.String(50), nullable = False)
  cabinet = db.Column(db.Integer, nullable = False)
  descriere = db.Column(db.String(200), nullable = False)
  contact = db.Column(db.String(100), nullable = False)
  recenzii = db.Column(db.String(300), nullable = False)

  def __init__(self, nume, prenume, cabinet, descriere, contact, recenzii):
    self.nume = nume
    self.prenume = prenume
    self.cabinet = cabinet
    self.descriere = descriere
    self.contact = contact
    self.recenzii = recenzii


class Doctori(db.Model):
  __tablename__ = 'doctori'

  id_doctor = db.Column(db.Integer, primary_key = True)
  nume = db.Column(db.String(50), nullable = False)
  prenume = db.Column(db.String(50), nullable = False)
  tip_doctor = db.Column(db.String(70), nullable = False)
  cabinet = db.Column(db.Integer, nullable = False)
  descriere = db.Column(db.String(200), nullable = False)
  contact = db.Column(db.String(100), nullable = False, unique = True)
  recenzii = db.Column(db.String(300), nullable = False)

  def __init__(self, nume, prenume, tip_doctor, cabinet, descriere, contact, recenzii):
    self.nume = nume
    self.prenume = prenume
    self.tip_doctor = tip_doctor
    self.cabinet = cabinet
    self.descriere = descriere
    self.contact = contact
    self.recenzii = recenzii


class Psihologi(db.Model):
  __tablename__ = 'psihologi'

  id_psiholog = db.Column(db.Integer, primary_key = True)
  nume = db.Column(db.String(50), nullable = False)
  prenume = db.Column(db.String(50), nullable = False)
  cabinet = db.Column(db.Integer, nullable = False)
  descriere = db.Column(db.String(200), nullable = False)
  contact = db.Column(db.String(100), nullable = False, unique = True)
  recenzii = db.Column(db.String(300), nullable = False)

  def __init__(self, nume, prenume, cabinet, descriere, contact, recenzii):
    self.nume = nume
    self.prenume = prenume
    self.cabinet = cabinet
    self.descriere = descriere
    self.contact = contact
    self.recenzii = recenzii


class Nutritie_Indicatie(db.Model):
  __tablename__ = 'Nutritie_indicatie'
  
  id_nutritie_indicatie = db.Column(db.Integer, primary_key = True)
  denumire = db.Column(db.String(50), nullable = False)
  pret = db.Column(db.Integer, nullable = False)

  def __init__(self, denumire, pret):
    self.denumire = denumire
    self.pret = pret


class Planuri_Alimentare(db.Model):
  __tablename__ = 'planuri_alimentare'

  id_plan = db.Column(db.Integer, primary_key = True)
  dieta = db.Column(db.String(500), nullable = False)
  ingrediente = db.Column(db.String(500), nullable = False)
  observatii = db.Column(db.String(500), nullable = False)

  def __init__(self, dieta, ingrediente, observatii):
    self.dieta = dieta
    self.ingrediente = ingrediente
    self.observatii = observatii


class Fisa_Medicala(db.Model):
  __tablename__ = 'fisa_medicala'

  id_fisa = db.Column(db.Integer, primary_key = True)
  istoric_medical = db.Column(db.String(50), nullable = False)
  observatii = db.Column(db.String(500), nullable = False)

  def __init__(self, istoric_medical, observatii):
    self.istoric_medical = istoric_medical
    self.observatii = observatii


class Retete_Medicale(db.Model):
  __tablename__ = 'retete_medicale'

  id_reteta_medicala = db.Column(db.Integer, primary_key = True)
  denumire_diagnostic = db.Column(db.String(350), nullable = False)
  medicamente = db.Column(db.String(500), nullable = False)

  def __init__(self, denumire_diagnostic, medicamente):
    self.denumire_diagnostic = denumire_diagnostic
    self.medicamente = medicamente


class Psiholog_Terapie(db.Model):
  __tablename__ = 'psiholog_terapie'

  id_psiholog_terapie = db.Column(db.Integer, primary_key = True)
  denumire = db.Column(db.String(50), nullable = False)
  pret = db.Column(db.Integer, nullable = False)

  def __init__(self, denumire, pret):
    self.denumire = denumire
    self.pret = pret


class Terapii(db.Model):
  __tablename__ = 'terapii'

  id_terapie = db.Column(db.Integer, primary_key = True)
  tip_terapie = db.Column(db.String(500), nullable = False)
  durata = db.Column(db.Integer, nullable = False)
  observatii = db.Column(db.String(500), nullable = False)

  def __init__(self, tip_terapie, durata, observatii):
    self.tip_terapie = tip_terapie
    self.durata = durata
    self.observatii = observatii


class Consultatii(db.Model):
  __tablename__ = 'consultatii'

  id_consultatie = db.Column(db.Integer, primary_key = True)
  data = db.Column(db.Date, default=date.today, nullable = False)
  simptome = db.Column(db.String(400), nullable = False)
  diagostic = db.Column(db.String(200), nullable = False)
  durata = db.Column(db.Integer, nullable = False)
  pret = db.Column(db.Integer, nullable = False)
  schema_tratament = db.Column(db.String(500), nullable = False)

  def __init__(self, data, simptome, diagnostic, durata, pret, schema_tratament):
    self.data = data
    self.simptome = simptome
    self.diagnostic = diagnostic
    self.durata = durata
    self.pret = pret
    self.schema_tratament = schema_tratament 


class Formular_de_prescriptie(db.Model):
  __tablename__ = 'formular_de_prescriptie'

  id_formular = db.Column(db.Integer, primary_key = True)
  tip_formular = db.Column(db.String(100), nullable = False)

  def __init__(self, tip_formular, nutritie, reteta, terapie, consultatie):
    self.tip_formular = tip_formular
    self.nutritie = nutritie
    self.reteta = reteta
    self.terapie = terapie
    self.consultatie = consultatie


with app.app_context():
  db.create_all()