import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { SensorGrid } from "@/components/dashboard/sensor-grid";
import { apiFetchServer } from "@/lib/api-server";
import { Sensor } from "@/types/sensor";
import { getServerSession } from "next-auth";
type Props = {
  params: { meter: string };
};
export default async function SensorGridPage({ params }: Props) {
  console.log(params.meter);
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;
  const sensors = await apiFetchServer<Sensor[]>(
    `/sensors/meter/${params.meter}`,
    token
  );

  return <SensorGrid sensors={sensors} />;
}
