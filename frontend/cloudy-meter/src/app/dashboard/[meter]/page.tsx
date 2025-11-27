import { SensorGrid } from "@/components/dashboard/sensor-grid";
import { apiFetchServer } from "@/lib/api-server";
import { authOptions } from "@/lib/auth-options";
import { Sensor } from "@/types/sensor";
import { getServerSession } from "next-auth";

export default async function SensorGridPage({
  params,
}: {
  params: { meter: string };
}) {
  console.log(params.meter);

  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const sensors = await apiFetchServer<Sensor[]>(
    `/sensors/meter/${params.meter}`,
    token
  );

  return <SensorGrid sensors={sensors} />;
}
