import { MeterStatus } from "./enums/MeterStatus";

export type Meter = {
  id: string;
  name: string;
  status: MeterStatus;
  battery: number | undefined; // 0..100
};
