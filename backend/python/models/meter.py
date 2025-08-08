from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime, Float, Boolean, ForeignKey, create_engine
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()


class Meter(Base):
    __tablename__ = 'meters'

    id = Column(Integer, primary_key=True)
    battery = Column(Integer)
    name = Column(String)
    sensors = relationship("Sensor", back_populates="meter")


class Sensor(Base):
    __tablename__ = 'sensors'

    id = Column(Integer, primary_key=True)
    isdefault = Column(Boolean, default=False)
    meter_id = Column(Integer, ForeignKey('meters.id'))
    
    meter = relationship("Meter", back_populates="sensors")
    readings = relationship("Reading", back_populates="sensor")


class Reading(Base):
    __tablename__ = 'readings'

    id = Column(Integer, primary_key=True)
    value = Column(Float(2), nullable=False)
    time = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    type = Column(String, nullable=False)
    sensor_id = Column(Integer, ForeignKey('sensors.id'))
    sensor = relationship("Sensor", back_populates="readings")
