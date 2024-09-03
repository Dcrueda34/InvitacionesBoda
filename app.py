import os
from flask import Flask, render_template, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.discovery import build


app = Flask(__name__)


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
