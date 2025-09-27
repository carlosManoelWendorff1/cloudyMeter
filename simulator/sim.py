import json
import random
import uuid
import threading
import time
from datetime import datetime

import dash
from dash import html, dcc
from dash.dependencies import Input, Output, State
import dash_bootstrap_components as dbc
import paho.mqtt.client as mqtt

# Configurações do broker MQTT
BROKER = "broker.hivemq.com"   # ou "test.mosquitto.org"
PORT = 1883
TOPIC = "cloudymeter/readings"

# Cliente MQTT
client = mqtt.Client(client_id=f"dashboard-{uuid.uuid4()}")
client.connect(BROKER, PORT, 60)
client.loop_start()

# Controle do loop de publicação
running = False
thread = None

def generate_reading(sensor_id: str):
    """Gera uma leitura no formato do DTO"""
    return {
        "value": round(random.uniform(10.0, 30.0), 2),
        "time": datetime.now().isoformat(),
        "sensorId": sensor_id,
    }

def publisher_loop():
    global running
    baseUmidade_sensor_id = "MAC-sensorBaseUmidade"
    baseTemperatura_sensor_id = "MAC-sensorBaseTemperatura"

    sensor_ids = [f"MAC-sensor{i}" for i in range(1, 4)]  # 3 sensores

    while running:
        for sensor_id in sensor_ids:
            reading = generate_reading(sensor_id)
            payload = json.dumps(reading)
            client.publish(TOPIC, payload, qos=1)
            print(f"📤 Publicado: {payload}")
        reading = generate_reading(baseUmidade_sensor_id)
        payload = json.dumps(reading)
        client.publish(TOPIC, payload, qos=1)
        print(f"📤 Publicado: {payload}")
        reading = generate_reading(baseTemperatura_sensor_id)
        payload = json.dumps(reading)
        client.publish(TOPIC, payload, qos=1)
        print(f"📤 Publicado: {payload}")

        time.sleep(5)  # publica a cada 5s

# Criando o app Dash
app = dash.Dash(__name__, external_stylesheets=[dbc.themes.BOOTSTRAP])

app.layout = dbc.Container(
    [
        html.H2("MQTT Sensor Simulator"),
        html.Hr(),
        dbc.Row(
            [
                dbc.Col(
                    dbc.Button("▶️ Iniciar", id="start-btn", color="success", className="me-2"),
                    width="auto",
                ),
                dbc.Col(
                    dbc.Button("⏹️ Parar", id="stop-btn", color="danger"),
                    width="auto",
                ),
            ],
            className="mb-3",
        ),
        dcc.Interval(id="interval", interval=1000, n_intervals=0),
        html.Div(id="status", className="mt-2"),
    ],
    fluid=True,
)

@app.callback(
    Output("status", "children"),
    Input("interval", "n_intervals"),
)
def update_status(_):
    return f"Status: {'🟢 Enviando dados' if running else '🔴 Parado'}"

@app.callback(
    Output("start-btn", "disabled"),
    Output("stop-btn", "disabled"),
    Input("start-btn", "n_clicks"),
    Input("stop-btn", "n_clicks"),
    prevent_initial_call=True,
)
def toggle_publisher(start_clicks, stop_clicks):
    global running, thread
    ctx = dash.callback_context

    if not ctx.triggered:
        raise dash.exceptions.PreventUpdate

    trigger_id = ctx.triggered[0]["prop_id"].split(".")[0]

    if trigger_id == "start-btn" and not running:
        running = True
        thread = threading.Thread(target=publisher_loop, daemon=True)
        thread.start()
    elif trigger_id == "stop-btn" and running:
        running = False

    return running, not running


if __name__ == "__main__":
    app.run(debug=True)
