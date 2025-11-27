import { getServerSession } from "next-auth";
import { apiFetchServer } from "@/lib/api-server";
import { Sensor } from "@/types/sensor";
import { SensorDashboard } from "@/components/dashboard/sensor-dashboard";
import { authOptions } from "@/lib/auth-options";

type Props = { params: { sensor: string } };

export default async function ReadingsPage({ params }: Props) {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const sensor = await apiFetchServer<Sensor>(
    `/sensors/${params.sensor}`,
    token
  );

  return <SensorDashboard sensor={sensor} />;
}
