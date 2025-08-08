#ifndef THERM_H
#define THERM_H

#include <Arduino.h>
#include <OneWire.h>
#include <DallasTemperature.h>

  class Therm
  {
    private:
      int pin;
      OneWire oneWire;
      DallasTemperature sensors;
    public:
      Therm(int Pin) : pin(Pin) {}
      void begin(){
      }
      float getTemp(){
        OneWire wire(pin);
        DallasTemperature sensor(&wire);
        sensor.begin();
        sensor.requestTemperatures(); 
        return sensor.getTempCByIndex(0);
      }

  };
#endif
