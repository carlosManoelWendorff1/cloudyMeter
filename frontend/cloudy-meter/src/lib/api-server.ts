import { redirect } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetchServer<T>(endpoint: string, token?: string) {
  console.log("Token de acesso para a API:", token);

  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      cache: "no-store",
    });

    if (res.status === 401 || res.status === 403) {
      // Pega a URL atual e passa como query param
      const currentPath =
        typeof window !== "undefined" ? window.location.pathname : "/";
      redirect(`/login?next=${encodeURIComponent(currentPath)}`);
    }

    if (res.status === 500) {
      const currentPath =
        typeof window !== "undefined" ? window.location.pathname : "/";
      redirect(`/error?next=${encodeURIComponent(currentPath)}`);
    }

    if (!res.ok) {
      console.error(`Erro na API ${endpoint}:`, res.statusText);
      return null as T;
    }

    try {
      return (await res.json()) as T;
    } catch (err) {
      console.error("Erro ao parsear JSON:", err);
      return null as T;
    }
  } catch (error) {
    console.log(error);
    const currentPath =
      typeof window !== "undefined" ? window.location.pathname : "/";
    redirect(`/error?next=${encodeURIComponent(currentPath)}`);
  }
}
