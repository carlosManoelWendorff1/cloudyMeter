#ifndef HDC_H
#define HDC_H

#include <Arduino.h>
#include <Wire.h>
#include "ClosedCube_HDC1080.h"

  class Hdc
  {
    private:
      ClosedCube_HDC1080 hdc1080;
    public:
      void setup(){
        hdc1080.begin(0x40);
      }
      double getTemp(){
        return hdc1080.readTemperature();
      }
      double getHum(){
        return hdc1080.readHumidity();
      }
  };
#endif
