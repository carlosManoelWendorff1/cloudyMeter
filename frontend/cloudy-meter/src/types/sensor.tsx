export type Sensor = {
  id: string;
  meterId: string;
  name: string;
  type: "TEMPERATURE" | "HUMIDITY" | "PRESSURE" | "GENERIC";
  unit: string; // e.g. °C, %, hPa
};
