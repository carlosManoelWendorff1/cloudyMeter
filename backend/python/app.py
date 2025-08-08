# app.py
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from controllers.controllers import controllers_blueprint

from decimal import Decimal
from flask import Flask, request, jsonify
from sqlalchemy import Column, Integer, String, DateTime, Float, Boolean, ForeignKey,create_engine
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime

from models.meter import Meter, Reading, Sensor

app = Flask(__name__)

db_username = "postgres_user"
db_password = "12345678"
db_host = "localhost"
db_port = "5432"
db_name = "postgres_user"

connection_string = f'postgresql://{db_username}:{db_password}@{db_host}:{db_port}/{db_name}'
engine = create_engine(connection_string)
Base = declarative_base()
DBSession = sessionmaker(bind=engine)
session = DBSession()
Base.metadata.create_all(engine)

# Enable CORS
CORS(app)

# Register the controllers
app.register_blueprint(controllers_blueprint, url_prefix='/api')

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
 