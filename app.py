import os
from flask import Flask, render_template, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.discovery import build


app = Flask(__name__)

# Configuración de la base de datos
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///confirmations.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'supersecretkey'
db = SQLAlchemy(app)

# Modelo para la base de datos
class Confirmation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    phone_number = db.Column(db.String(20), unique=True, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    adults = db.Column(db.Integer, nullable=False)
    children = db.Column(db.Integer, nullable=False)
    choice = db.Column(db.String(10), nullable=False)

# Crea la base de datos si no existe
with app.app_context():
    db.create_all()

# Configuración de Google Sheets
SERVICE_ACCOUNT_FILE = os.path.expanduser("C:/Users/hp/OneDrive/Escritorio/service-account-file.json")

# Verificar si el archivo de credenciales existe
if not os.path.exists(SERVICE_ACCOUNT_FILE):
    print("Error: El archivo de credenciales no se encontró en la ruta especificada.")
else:
    print("El archivo de credenciales se encontró correctamente.")

    SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"]

    # Crear credenciales desde el archivo de cuenta de servicio
    creds = service_account.Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE, scopes=SCOPES)
    SERVICE = build('sheets', 'v4', credentials=creds)
    SHEET_ID = 'your-google-sheet-id'
    RANGE_NAME = 'Sheet1!A:E'
def read_google_sheets():
    sheet = SERVICE.spreadsheets()
    result = sheet.values().get(spreadsheetId=SHEET_ID, range=RANGE_NAME).execute()
    values = result.get('values', [])
    return values

@app.route('/')
def home():
    return render_template('invitation.html')

@app.route('/pildoraAzul')
def redirectToInvitation():
    return render_template('pildoraAzul.html')

@app.route('/pildoraRoja')
def redirectToConfirmation():
    return render_template('pildoraRoja.html')
  


if __name__ == '__main__':
    app.run(debug=True)
