# services.py

from decimal import Decimal
from flask import Flask, request, jsonify
from sqlalchemy import Column, Integer, String, DateTime, Float, Boolean, ForeignKey,create_engine
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
from flask_swagger import swagger

from models.meter import Meter, Reading, Sensor

# If DATABASE_URL is not set, use default connection (MySQL)
db_username = "postgres_user"
db_password = "12345678"
db_host = "localhost"
db_port = "5432"
db_name = "postgres_user"

connection_string = f'postgresql://{db_username}:{db_password}@{db_host}:{db_port}/{db_name}'
engine = create_engine(connection_string)
Base = declarative_base()
DBSession = sessionmaker(bind=engine)

class ReadingService:
    @staticmethod
    def create_reading(value, time, sensor_id, type):
        session = DBSession()
        reading = Reading(value=value, time=time, sensor_id=sensor_id,type=type)
        session.add(reading)
        session.commit()
        return reading.id

    @staticmethod
    def get_readings():
        session = DBSession()
        readings = session.query(Reading).order_by(Reading.time.asc()).all()
        session.close()
        return [{"id": reading.id, "value": reading.value, "time": reading.time, "sensor_id": reading.sensor_id,"type": reading.type} for reading in readings]

    @staticmethod
    def get_sensor_readings(sensor_id):
        session = DBSession()
        readings = session.query(Reading).filter_by(sensor_id=sensor_id).order_by(Reading.time.asc()).all()
        session.close()
        return [{"id": reading.id, "value": reading.value, "time": reading.time, "sensor_id": reading.sensor_id,"type": reading.type} for reading in readings]
    
    @staticmethod
    def get_meter_readings(meter_id):
        session = DBSession()
        readings = session.query(Reading).join(Sensor).filter(Sensor.meter_id == meter_id).order_by(Reading.time.asc()).all()
        session.close()
        return [{"id": reading.id, "value": reading.value, "time": reading.time, "sensor_id": reading.sensor_id,"type": reading.type} for reading in readings]

    @staticmethod
    def get_meter_readings(meter_id, timeStart, timeEnd):
        session = DBSession()
        readings = session.query(Reading).join(Sensor).filter(Sensor.meter_id == meter_id).filter(Reading.time >= timeStart).filter(Reading.time <= timeEnd).order_by(Reading.time.asc()).all()
        session.close()
        return [{"id": reading.id, "value": reading.value, "time": reading.time, "sensor_id": reading.sensor_id,"type": reading.type} for reading in readings]

    # Implement update and delete methods for Reading, if needed
class SensorService:
    @staticmethod
    def create_sensor(isdefault,meter_id):
        session = DBSession()
        sensor = Sensor(isdefault=isdefault, meter_id=meter_id)
        session.add(sensor)
        session.commit()
        return sensor.id

    @staticmethod
    def get_sensors():
        session = DBSession()
        sensors = session.query(Sensor).all()
        session.close()
        return [{"id": sensor.id, "isDefault": sensor.isdefault, "meter_id": sensor.meter_id} for sensor in sensors]

    @staticmethod
    def get_meter_sensors(meter_id):
        session = DBSession()
        sensors = session.query(Sensor).filter_by(meter_id=meter_id).all()
        session.close()
        return [{"id": sensor.id, "isdefault": sensor.isDefault, "time": sensor.time} for sensor in sensors]

class MeterService:
    @staticmethod
    def create_meter(battery, name):
        session = DBSession()
        meter = Meter(battery=battery, name=name)
        session.add(meter)
        session.commit()
        return meter.id

    @staticmethod
    def get_meters():
        session = DBSession()
        meters = session.query(Meter).all()
        session.close()
        return [{"id": meter.id, "battery": meter.battery, "name": meter.name} for meter in meters]

    @staticmethod
    def get_meter(meter_id):
        session = DBSession()
        meter = session.query(Meter).get(meter_id)
        session.close()
        if meter:
            return {"id": meter.id, "battery": meter.battery}
        else:
            return None

    @staticmethod
    def update_meter(meter_id, new_battery, new_name):
        session = DBSession()
        meter = session.query(Meter).get(meter_id)
        if meter:
            meter.battery = new_battery
            meter.name = new_name
            session.commit()
            session.close()
            return {"message": "Meter updated successfully", "meter_id": meter.id}
        else:
            session.close()
            return None

    @staticmethod
    def delete_meter(meter_id):
        session = DBSession()
        meter = session.query(Meter).get(meter_id)
        if meter:
            session.delete(meter)
            session.commit()
            session.close()
            return {"message": "Meter deleted successfully", "meter_id": meter.id}
        else:
            session.close()
            return None

