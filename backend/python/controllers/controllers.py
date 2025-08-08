# controllers.py
from flask import Flask, request, jsonify
from services.services import MeterService, ReadingService, SensorService
from flask import Blueprint
from datetime import datetime

controllers_blueprint = Blueprint('controllers', __name__)

app = Flask(__name__)

# Initialize services
meter_service = MeterService()
reading_service = ReadingService()
sensor_service = SensorService()



@controllers_blueprint.route('/meters', methods=['POST'])
def create_meter():
    data = request.get_json()
    if "battery" in data:
        battery = data["battery"]
        name = data["name"]
        meter_id = meter_service.create_meter(battery, name)
        return jsonify({"message": "Meter created successfully", "meter_id": meter_id}), 201
    else:
        return jsonify({"error": "Missing 'battery and name' value"}), 400

@controllers_blueprint.route('/meters', methods=['GET'])
def get_meters():
    meters = meter_service.get_meters()
    return jsonify(meters)

@controllers_blueprint.route('/meters/<int:meter_id>', methods=['GET'])
def get_meter(meter_id):
    meter = meter_service.get_meter(meter_id)
    if meter:
        return jsonify(meter)
    else:
        return jsonify({"error": "Meter not found"}), 404

@controllers_blueprint.route('/meters/<int:meter_id>', methods=['PUT'])
def update_meter(meter_id):
    data = request.get_json()
    new_battery = data.get("battery")
    new_name = data.get("name")
    result = meter_service.update_meter(meter_id, new_battery, new_name=new_name)
    if result:
        return jsonify(result)
    else:
        return jsonify({"error": "Meter not found"}), 404

@controllers_blueprint.route('/meters/<int:meter_id>', methods=['DELETE'])
def delete_meter(meter_id):
    result = meter_service.delete_meter(meter_id)
    if result:
        return jsonify(result)
    else:
        return jsonify({"error": "Meter not found"}), 404

@controllers_blueprint.route('/readings', methods=['POST'])
def create_reading():
    data = request.get_json()
    if "value" in data and "time" in data and "type" in data and "sensor_id" in data:
        value = data["value"]
        time = data["time"]
        sensor_id = data["sensor_id"]
        type = data["type"]
        reading_id = reading_service.create_reading(value, time, sensor_id,type)
        return jsonify({"message": "Reading created successfully", "reading_id": reading_id}), 201
    else:
        return jsonify({"error": "Missing values"}), 400

@controllers_blueprint.route('/readings', methods=['GET'])
def get_readings():
    readings = reading_service.get_readings()
    return jsonify(readings)

@controllers_blueprint.route('/sensors/<int:sensor_id>/readings', methods=['GET'])
def get_sensor_readings(sensor_id):
    readings = reading_service.get_sensor_readings(sensor_id)
    return jsonify(readings)

@controllers_blueprint.route('/meters/<int:meters_id>/readings', methods=['GET'])
def get_meter_readings(meters_id):
    date_str_start = request.args.get('date_start')
    date_str_end = request.args.get('date_end')
    try:
        date_start = datetime.strptime(date_str_start, '%Y-%m-%d')
        date_end = datetime.strptime(date_str_end, '%Y-%m-%d')
        readings = reading_service.get_meter_readings(meters_id, date_start, date_end)
        return jsonify(readings)
    except ValueError:
        return jsonify({'error': 'Invalid date format. Please use YYYY-MM-DD.'}), 400


@controllers_blueprint.route('/sensors', methods=['GET'])
def get_sensors():
    sensors = sensor_service.get_sensors()
    return jsonify(sensors)

@controllers_blueprint.route('/sensors', methods=['POST'])
def create_sensor():
    data = request.get_json()
    if "isdefault" in data and "meter_id" in data:
        isdefault = data.get("isdefault")
        meter_id = data.get("meter_id")
        sensor_id = sensor_service.create_sensor(isdefault,meter_id)
        return jsonify(sensor_id)
    else:
        return jsonify("bad Request")