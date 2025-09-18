"use client";

import { useRouter } from "next/router";
import { toast } from "react-toastify";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch<T>(
  endpoint: string,
  customErrorMessage?: string,
  options?: RequestInit
): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      headers:
        endpoint === "/auth/login"
          ? {
              "Content-Type": "application/json",
            }
          : {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("auth") || ""}`,
            },
      ...options,
    });

    if (res.ok === false) {
      const defaultMessage = `Erro ${res.status}: ${
        res.statusText.length > 0 ? res.statusText : "Not Found or Server Error"
      }`;

      toast.error(customErrorMessage || defaultMessage);
      return null;
    }

    return (await res.json()) as T;
  } catch (err: any) {
    console.error("API Fetch Error:", err);
    toast.error(customErrorMessage || `Falha de conexão: ${err.message}`);
    return null;
  }
}
