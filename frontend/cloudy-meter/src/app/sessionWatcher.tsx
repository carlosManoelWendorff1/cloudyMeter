"use client";

import { ReactNode, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";

export function SessionWatcher({ children }: { children: ReactNode }) {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signOut({ callbackUrl: "/login" });
    }
  }, [session]);

  return <>{children}</>;
}
