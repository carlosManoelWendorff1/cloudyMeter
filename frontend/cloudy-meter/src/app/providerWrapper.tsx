// app/ProvidersWrapper.tsx (Client Component)
"use client";

import { SessionProvider } from "next-auth/react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ToastContainer } from "react-toastify";
import { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";

export function ProvidersWrapper({ children }: { children: ReactNode }) {
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
