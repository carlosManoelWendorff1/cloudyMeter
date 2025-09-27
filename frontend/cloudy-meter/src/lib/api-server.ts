// lib/api-server.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetchServer<T>(endpoint: string, token?: string) {
  console.log("Token de acesso para a API:", token);
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch ${endpoint}: ${res.statusText}`);
  }

  return (await res.json()) as T;
}
