"use client";

import { toast } from "react-toastify";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch<T>(
  endpoint: string,
  customErrorMessage?: string,
  options?: RequestInit
): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    });

    if (!res.ok) {
      const defaultMessage = `Erro ${res.status}: ${
        res.statusText.length > 0 ? res.statusText : "Not Found or Server Error"
      }`;

      toast.error(customErrorMessage || defaultMessage);
      return null;
    }

    return (await res.json()) as T;
  } catch (err: any) {
    toast.error(customErrorMessage || `Falha de conexão: ${err.message}`);
    return null;
  }
}
