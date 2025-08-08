#include <WiFi.h>
#include "Hdc.h"
#include "Therm.h"
#include "NTPClient.h"
#include <WiFiUdp.h>
#include <stdio.h>

const char* ssid = "WickedBotz";
const char* password = "wickedbotz";
const char* serverName = "manfred.ddns.com.br";  // Replace with your server's address
const int serverPort = 3001;                // HTTP

unsigned long currentMillis = 0;

Hdc hdc;
Therm therm_1(13);
Therm therm_2(14);
Therm therm_3(27);

const long utcOffsetInSeconds = 0; // Deslocamento UTC para o fuso horário local em segundos
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org", utcOffsetInSeconds);

String getActualTIme(){
  timeClient.update();
  return  timeClient.getFormattedDate();
}

void setup() {
  Serial.begin(115200);
  delay(1000);
  hdc.setup();
  therm_1.begin();
  therm_2.begin();
  therm_3.begin();
  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");
  timeClient.begin();  
  Serial.print("Actual time: ");
  Serial.println(getActualTIme());
  delay(1000);
}

void loop() {
  currentMillis = millis();

  String currentTime = getActualTIme();
  Serial.println(currentTime);
  float sensorTemp = hdc.getTemp();
  Serial.println(sensorTemp);
  float sensorHum = hdc.getHum();
  Serial.println(sensorHum);

  float therm_1_value = therm_1.getTemp();
  Serial.println(therm_1_value);
  float therm_2_value = therm_2.getTemp();
  Serial.println(therm_2_value);
  float therm_3_value = therm_3.getTemp();
  Serial.println(therm_3_value);

  String value[5] = {String(sensorTemp), String(sensorHum), String(therm_1_value, 1), String(therm_2_value, 1), String(therm_3_value, 1) };

  for (int i = 1; i < 6; i++) {
    WiFiClient client;
    if (!client.connect(serverName, serverPort)) {
      Serial.println("Connection failed");
      return;
    }
    Serial.println(i);
    String tipe = "temp";
    if(i==2){
      tipe = "hum";
    }
    String url = "/api/readings";

    String body = String("{\r\n  \"value\": ") + value[i - 1] + ",\r\n" 
      + "  \"time\": \"" + currentTime + "\",\r\n" + "  \"sensor_id\":" 
      + String(i) + ",\r\n" + "  \"type\": \"" + tipe + "\"\r\n" + "}";


    String request = String("POST ") + url + " HTTP/1.1\r\n" + "Host: " + serverName + "\r\n" 
      + "Content-Type: application/json\r\n" + "Content-Length: " 
      + body.length() + "\r\n" + "Connection: close\r\n\r\n" + body;

    client.print(request);
    Serial.print(body);
    Serial.println("Sending request...");
    unsigned long timeout = millis();
    while (client.available() == 0) {
      if (millis() - timeout > 5000) {
        Serial.println("Timeout");
        return;
      }
    }

    // Read response from the server
    while (client.available()) {
      String line = client.readStringUntil('\r');
      Serial.print(line);
    }

    Serial.println();
    Serial.println("Request sent");
    client.stop();
    delay(5000);
  }
  delay(5000);  // Adjust the delay based on your requirements
}
