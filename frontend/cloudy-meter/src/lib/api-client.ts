"use client";

import { getSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { toast } from "react-toastify";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export async function apiFetch<T>(
  endpoint: string,
  customErrorMessage?: string,
  options?: RequestInit
): Promise<T | null> {
  try {
    const session = await getSession();

    const res = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...(endpoint !== "/auth/login" && session?.accessToken
          ? { Authorization: `Bearer ${session.accessToken}` }
          : {}),
      },
      ...options,
    });

    if (!res.ok) {
      const defaultMessage = `Erro ${res.status}: ${
        res.statusText.length > 0 ? res.statusText : "Not Found or Server Error"
      }`;

      toast.error(customErrorMessage || defaultMessage, { theme: "colored" });
      return null;
    }

    return (await res.json()) as T;
  } catch (err: any) {
    console.error("API Fetch Error:", err);
    toast.error(customErrorMessage || `Falha de conexão: ${err.message}`, {
      theme: "colored",
    });
    return null;
  }
}
