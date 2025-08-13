export type Meter = {
  id: string;
  name: string;
  status: "online" | "offline" | "maintenance";
  battery: number; // 0..100
};
