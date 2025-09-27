import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ReadingsGrid } from "@/components/dashboard/readings-grid";
import { SensorChart } from "@/components/dashboard/sensor-chart";
import { apiFetchServer } from "@/lib/api-server";
import { Reading } from "@/types/reading";
import { Sensor } from "@/types/sensor";
import { getServerSession } from "next-auth";
type Props = {
  params: { sensor: string };
};
export default async function ReadingsPage({ params }: Props) {
  const { sensor } = params;

  const session = await getServerSession(authOptions);
  const token = session?.accessToken;
  const readings = await apiFetchServer<Reading[]>(
    `/readings/sensor/${sensor}`,
    token
  );
  const sensorApi = await apiFetchServer<Sensor>(`/sensors/${sensor}`, token);

  console.log(sensorApi);
  return (
    <div className="p-4 h-full gap-4 grid ">
      <SensorChart
        title={`${sensorApi.id} (${sensorApi.type})`}
        unit={`${sensorApi.unit}`}
        readings={readings}
        maxThreshold={sensorApi.maxThreshold}
        minThreshold={sensorApi.minThreshold}
      />
      <ReadingsGrid rows={readings} />
    </div>
  );
}
