import { useEffect, useState, useRef } from "react";
import { apiFetch } from "@/lib/api-client";

interface UsePollingOptions<T> {
  intervalMs?: number; // intervalo do polling em ms
  initialData?: T | null; // dados iniciais do servidor
}

export function usePolling<T>(
  url: string,
  intervalMs: number = 60000,
  initialData: T | null = null
) {
  const [data, setData] = useState<T | null>(initialData);
  const [loading, setLoading] = useState(!initialData); // true se não tem inicial
  const [error, setError] = useState<any>(null);

  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    let timer: NodeJS.Timeout;

    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await apiFetch<T>(url);
        if (isMounted.current) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (isMounted.current) setError(err);
        console.error("Polling fetch error:", err);
      } finally {
        if (isMounted.current) setLoading(false);
      }
    };

    fetchData(); // fetch inicial
    timer = setInterval(fetchData, intervalMs);

    return () => {
      isMounted.current = false;
      clearInterval(timer);
    };
  }, [url, intervalMs]);

  return { data, loading, error };
}
