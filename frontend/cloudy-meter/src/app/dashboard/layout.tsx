import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Meter } from "@/types/meter";
import { apiFetchServer } from "@/lib/api-server";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;
  const meters = await apiFetchServer<Meter[]>("/meters/list", token);

  return (
    <SidebarProvider>
      <AppSidebar meters={meters || []} />
      <main className="w-full h-100vh">{children}</main>
    </SidebarProvider>
  );
}
