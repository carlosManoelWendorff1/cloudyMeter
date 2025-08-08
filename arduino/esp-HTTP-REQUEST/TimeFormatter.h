#ifndef TimeFormatter_h
#define TimeFormatter_h

#include <Arduino.h>

class TimeFormatter {
  public:
    String format(unsigned long milliseconds) {
      // Adiciona 8 segundos ao tempo em millis
      milliseconds += 8000;

      // Converte millis para segundos
      unsigned long seconds = milliseconds / 1000;

      // Calcula as partes da data e hora
      unsigned long days = seconds / 86400;
      seconds %= 86400;
      byte hours = seconds / 3600;
      seconds %= 3600;
      byte minutes = seconds / 60;
      byte secs = seconds % 60;

      // Constrói a string formatada
      char buffer[20]; // Suficiente para armazenar a data e hora
      sprintf(buffer, "%04lu-%02lu-%02luT%02u:%02u:%02u", days * 86400UL + 2024, 4, 16, hours, minutes, secs);

      return String(buffer);
    }
};

#endif