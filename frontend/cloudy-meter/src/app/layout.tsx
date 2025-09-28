"use client";

import "./globals.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ProvidersWrapper } from "./providerWrapper";
import { SessionWatcher } from "./sessionWatcher";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ProvidersWrapper>
          <SessionWatcher>{children}</SessionWatcher>
        </ProvidersWrapper>
      </body>
    </html>
  );
}
