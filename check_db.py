from app import db, Confirmation

# Consultar todas las confirmaciones
confirmations = Confirmation.query.all()
for confirmation in confirmations:
    print(confirmation.phone_number, confirmation.name, confirmation.adults, confirmation.children, confirmation.choice)

