"use client";

import { SessionProvider } from "next-auth/react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ToastContainer } from "react-toastify";
import { ReactNode, useEffect, useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";

export function ProvidersWrapper({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // só renderiza após montar no cliente
  }, []);

  if (!mounted) return null; // ou um skeleton/loading se quiser

  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <SessionProvider>
        <SidebarProvider>
          {children}
          <ToastContainer position="top-right" autoClose={3000} />
        </SidebarProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
