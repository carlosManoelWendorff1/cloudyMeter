#include <WiFi.h>
#include <PubSubClient.h>
#include <WiFiUdp.h>
#include <NTPClient.h>
#include "Hdc.h"
#include "Therm.h"
#include "BluetoothSerial.h"  // <<== Biblioteca necessária

// ==== CONFIGURAÇÕES DE REDE ====
const char* ssid = "Wendorff_2.4G";
const char* password = "52134418";

// ==== CONFIGURAÇÕES MQTT ====
const char* mqtt_server = "broker.hivemq.com";
const int mqtt_port = 1883;
const char* mqtt_topic = "cloudymeter/readings";

// ==== OBJETOS ====
WiFiClient espClient;
PubSubClient client(espClient);
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org", 0); // UTC

BluetoothSerial SerialBT; // <<== objeto Bluetooth serial

Hdc hdc;
Therm therm_1(13);
Therm therm_2(14);
Therm therm_3(27);

String macAddress; // armazenará o MAC formatado

// ==== FUNÇÕES ====

void reconnectMQTT() {
  while (!client.connected()) {
    SerialBT.print("Tentando conectar ao MQTT...");
    String clientId = "esp32-" + String(random(0xffff), HEX);
    if (client.connect(clientId.c_str())) {
      SerialBT.println(" Conectado!");
    } else {
      SerialBT.print(" Falhou, rc=");
      SerialBT.print(client.state());
      SerialBT.println(" tentando novamente em 5s");
      delay(5000);
    }
  }
}

String getISOTime() {
  timeClient.update();
  return timeClient.getFormattedDate();
}

void publishReading(String sensorIdSuffix, float value) {
  String sensorId = macAddress + "-" + sensorIdSuffix;
  String payload = "{";
  payload += "\"value\": " + String(value, 2) + ",";
  payload += "\"time\": \"" + getISOTime() + "\",";
  payload += "\"sensorId\": \"" + sensorId + "\"";
  payload += "}";

  SerialBT.println("====================================");
  SerialBT.println("📤 Publicando leitura MQTT:");
  SerialBT.print("Tópico: ");
  SerialBT.println(mqtt_topic);
  SerialBT.print("Payload: ");
  SerialBT.println(payload);
  SerialBT.println("====================================");

  client.publish(mqtt_topic, payload.c_str());
}

// ==== SETUP ====
void setup() {
  Serial.begin(115200);
  SerialBT.begin("CloudyMeter"); // <<== nome Bluetooth visível
  delay(1000);

  SerialBT.println("Iniciando dispositivo...");

  // Sensores
  hdc.setup();
  therm_1.begin();
  therm_2.begin();
  therm_3.begin();

  // Conexão WiFi
  SerialBT.print("Conectando-se a ");
  SerialBT.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    SerialBT.print(".");
  }
  SerialBT.println("\n✅ WiFi conectado");

  // Captura MAC address real
  macAddress = WiFi.macAddress();
  SerialBT.print("🆔 Endereço MAC do dispositivo: ");
  SerialBT.println(macAddress);

  // NTP
  timeClient.begin();

  // MQTT
  client.setServer(mqtt_server, mqtt_port);
  SerialBT.println("MQTT configurado.");
}

// ==== LOOP PRINCIPAL ====
void loop() {
  if (!client.connected()) {
    reconnectMQTT();
  }
  client.loop();

  // Lê sensores
  float humBase = hdc.getHum();
  float tempBase = hdc.getTemp();
  float t1 = therm_1.getTemp();
  float t2 = therm_2.getTemp();
  float t3 = therm_3.getTemp();

  // Publica leituras
  publishReading("sensorBaseUmidade", humBase);
  publishReading("sensorBaseTemperatura", tempBase);
  publishReading("sensor1", t1);
  publishReading("sensor2", t2);
  publishReading("sensor3", t3);

  delay(30000); // 30 segundos
}
