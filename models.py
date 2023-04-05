from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from datetime import date
from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship

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
  public_id = db.Column(db.String(50), unique = True)
  admin = db.Column(db.Boolean)
  pacienti = db.relationship('Pacienti', backref='Utilizatori', uselist=False)
  nutritionisti = db.relationship('Nutritionisti', backref='Utilizatori', uselist=False)
  psihologi = db.relationship('Psihologi', backref='Utilizatori', uselist=False)
  doctori = db.relationship('Doctori', backref='utilizatori', uselist=False)
  
  def __init__(self, nume_utilizator, parola, email, tip_utilizator, public_id, admin):
    self.nume_utilizator = nume_utilizator
    self.parola = parola
    self.email = email
    self.tip_utilizator = tip_utilizator
    self.public_id = public_id
    self.admin = admin


class Fisa_Medicala(db.Model):
  __tablename__ = 'fisa_medicala'

  id_fisa = db.Column(db.Integer, primary_key = True)
  istoric_medical = db.Column(db.String(50), nullable = False)
  observatii = db.Column(db.String(500), nullable = False)
  pacienti_id_pacient = db.Column(db.Integer, db.ForeignKey('pacienti.id_pacient'), unique = True)
  consultatii = db.relationship('Consultatii', backref = 'Fisa_Medicala')  

  def __init__(self, istoric_medical, observatii):
    self.istoric_medical = istoric_medical
    self.observatii = observatii


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
  utilizatori_id_utilizator = db.Column(db.Integer, db.ForeignKey('utilizatori.id_utilizator'))
  fisa_medicala = db.relationship('Fisa_Medicala', backref='Pacienti', uselist = False)

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
  utilizatori_id_utilizator = db.Column(db.Integer, db.ForeignKey('utilizatori.id_utilizator'))
  nutritie_indicatie = db.relationship('Nutritie_Indicatie', backref = 'Nutritionisti')
  cadre_medicale_id_cadru = db.Column(db.Integer, db.ForeignKey('cadre_medicale.id_cadru'))

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
  utilizatori_id = db.Column(db.Integer, db.ForeignKey('utilizatori.id_utilizator'))
  retete_medicale = db.relationship('Retete_Medicale', backref = 'doctori')
  cadre_medicale_id_cadru = db.Column(db.Integer, db.ForeignKey('cadre_medicale.id_cadru'))
  
  def __init__(self, nume, prenume, tip_doctor, cabinet, descriere, contact, recenzii, utilizatori_id, cadre_medicale_id_cadru):
    self.nume = nume
    self.prenume = prenume
    self.tip_doctor = tip_doctor
    self.cabinet = cabinet
    self.descriere = descriere
    self.contact = contact
    self.recenzii = recenzii
    self.utilizatori_id = utilizatori_id
    self.cadre_medicale_id_cadru = cadre_medicale_id_cadru


class Psihologi(db.Model):
  __tablename__ = 'psihologi'

  id_psiholog = db.Column(db.Integer, primary_key = True)
  nume = db.Column(db.String(50), nullable = False)
  prenume = db.Column(db.String(50), nullable = False)
  cabinet = db.Column(db.Integer, nullable = False)
  descriere = db.Column(db.String(200), nullable = False)
  contact = db.Column(db.String(100), nullable = False, unique = True)
  recenzii = db.Column(db.String(300), nullable = False)
  utilizatori_id_utilizator = db.Column(db.Integer, db.ForeignKey('utilizatori.id_utilizator'))
  psiholog_terapie = db.relationship('Psiholog_Terapie', backref = 'Psihologi')
  cadre_medicale_id_cadru = db.Column(db.Integer, db.ForeignKey('cadre_medicale.id_cadru'))

  def __init__(self, nume, prenume, cabinet, descriere, contact, recenzii, utilizatori_id_utilizator, cadre_medicale_id_cadru):
    self.nume = nume
    self.prenume = prenume
    self.cabinet = cabinet
    self.descriere = descriere
    self.contact = contact
    self.recenzii = recenzii
    self.utilizatori_id_utilizator = utilizatori_id_utilizator
    self.cadre_medicale_id_cadru = cadre_medicale_id_cadru


class Nutritie_Indicatie(db.Model):
  __tablename__ = 'nutritie_indicatie'
  
  id_nutritie_indicatie = db.Column(db.Integer, primary_key = True)
  denumire = db.Column(db.String(50), nullable = False)
  pret = db.Column(db.Integer, nullable = False)
  formular_de_prescriptie_id_formular = db.Column(db.Integer, db.ForeignKey('formular_de_prescriptie.id_formular'))
  nutritionisti_id_nutritionist = db.Column(db.Integer, db.ForeignKey('nutritionisti.id_nutritionist'))
  planuri_alimentare_id_plan = db.Column(db.Integer, db.ForeignKey('planuri_alimentare.id_plan'))

  def __init__(self, denumire, pret):
    self.denumire = denumire
    self.pret = pret


class Planuri_Alimentare(db.Model):
  __tablename__ = 'planuri_alimentare'

  id_plan = db.Column(db.Integer, primary_key = True)
  dieta = db.Column(db.String(500), nullable = False)
  ingrediente = db.Column(db.String(500), nullable = False)
  observatii = db.Column(db.String(500), nullable = False)
  nutritie_indicatie = db.relationship('Nutritie_Indicatie', backref = 'Planuri_Alimentare')

  def __init__(self, dieta, ingrediente, observatii):
    self.dieta = dieta
    self.ingrediente = ingrediente
    self.observatii = observatii


class Retete_Medicale(db.Model):
  __tablename__ = 'retete_medicale'

  id_reteta_medicala = db.Column(db.Integer, primary_key = True)
  denumire_diagnostic = db.Column(db.String(350), nullable = False)
  medicamente = db.Column(db.String(500), nullable = False)
  formular_de_prescriptie_id_formular = db.Column(db.Integer, db.ForeignKey('formular_de_prescriptie.id_formular'))
  doctori_id_doctor = db.Column(db.Integer, db.ForeignKey('doctori.id_doctor'))

  def __init__(self, denumire_diagnostic, medicamente):
    self.denumire_diagnostic = denumire_diagnostic
    self.medicamente = medicamente


class Psiholog_Terapie(db.Model):
  __tablename__ = 'psiholog_terapie'

  id_psiholog_terapie = db.Column(db.Integer, primary_key = True)
  denumire = db.Column(db.String(50), nullable = False)
  pret = db.Column(db.Integer, nullable = False)
  formular_de_prescriptie_id_formular = db.Column(db.Integer, db.ForeignKey('formular_de_prescriptie.id_formular'))
  psihologi_id_psiholog = db.Column(db.Integer, db.ForeignKey('psihologi.id_psiholog'))
  terapii_id_terapie = db.Column(db.Integer, db.ForeignKey('terapii.id_terapie'))

  def __init__(self, denumire, pret):
    self.denumire = denumire
    self.pret = pret


class Terapii(db.Model):
  __tablename__ = 'terapii'

  id_terapie = db.Column(db.Integer, primary_key = True)
  tip_terapie = db.Column(db.String(500), nullable = False)
  durata = db.Column(db.Integer, nullable = False)
  observatii = db.Column(db.String(500), nullable = False)
  psiholog_terapie = db.relationship('Psiholog_Terapie', backref = 'Terapii')

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
  formular_de_prescriptie_id_formular = db.Column(db.Integer, db.ForeignKey('formular_de_prescriptie.id_formular'))
  fisa_medicala_id_fisa = db.Column(db.Integer, db.ForeignKey('fisa_medicala.id_fisa'))
  cadre_medicale_id_cadru = db.Column(db.Integer, db.ForeignKey('cadre_medicale.id_cadru'))
  
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
  nutritie_indicatie = db.relationship('Nutritie_Indicatie', backref='Formular_de_prescriptie', uselist = False)
  psiholog_terapie = db.relationship('Psiholog_Terapie', backref='Formular_de_prescriptie', uselist = False)
  retete_medicale = db.relationship('Retete_Medicale', backref='Formular_de_prescriptie', uselist = False)
  consultatii = db.relationship('Consultatii', backref='Formular_de_prescriptie', uselist = False)

  def __init__(self, tip_formular):
    self.tip_formular = tip_formular


class Cadre_medicale(db.Model):
  __tablename__ = 'cadre_medicale'

  id_cadru = db.Column(db.Integer, primary_key = True)
  tip_cadru_medical = db.Column(db.String(100), nullable = False)
  nutritionisti = db.relationship('Nutritionisti', backref = 'Cadre_medicale', uselist = False)
  doctori = db.relationship('Doctori', backref = 'Cadre_medicale', uselist = False)
  psihologi = db.relationship('Psihologi', backref = 'Cadre_medicale', uselist = False)
  consultatii = db.relationship('Consultatii', backref = 'Cadre_medicale')

  def __init__(self, tip_cadru_medical):
    self.tip_cadru_medical = tip_cadru_medical
  

with app.app_context():
  db.create_all()