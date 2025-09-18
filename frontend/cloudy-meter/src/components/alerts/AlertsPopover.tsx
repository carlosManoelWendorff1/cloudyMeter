"use client";

import { useEffect, useState } from "react";
import { Bell, CloudAlertIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Alert } from "@/types/alerts";
import { apiFetch } from "@/lib/api-client";
import { cn } from "@/lib/utils";

interface AlertsPopoverProps {
  sensorId: string;
}

export default function AlertsPopover({ sensorId }: AlertsPopoverProps) {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    async function fetchAlerts() {
      setLoading(true);
      try {
        const data = await apiFetch<Alert[]>(
          `/alerts/sensor/${sensorId}`,
          `Error fetching alerts for sensor ${sensorId}`
        );
        if (data) setAlerts(data);
        console.log("Fetched alerts:", data);
      } catch (err) {
        console.error("Erro ao buscar alerts:", err);
      } finally {
        setLoading(false);
      }
    }

    if (sensorId) {
      fetchAlerts(); // busca inicial
      intervalId = setInterval(fetchAlerts, 5000); // busca a cada 5s
    }

    // cleanup para não ficar acumulando intervalos
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [sensorId]);
  const hasAlerts = alerts.length > 0;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell
            className={cn(
              "h-5 w-5 transition-colors",
              hasAlerts ? "text-red-600 animate-bounce" : "text-gray-600"
            )}
          />
          {hasAlerts && (
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-600 animate-pulse" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <CloudAlertIcon className="w-5 h-5 text-red-600" />
            <span className="font-semibold text-red-700 text-base">
              Últimos alertas
            </span>
          </div>
          {loading ? (
            <p className="text-sm text-gray-500">Carregando...</p>
          ) : alerts.length > 0 ? (
            alerts
              .slice(-5)
              .reverse()
              .map((alert) => (
                <div
                  key={alert.id}
                  className="rounded-lg border p-3 text-sm shadow bg-gradient-to-r from-red-50 to-red-100 border-red-200 text-red-800 flex flex-col items-start"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{alert.message}</span>
                  </div>
                  {alert.time && (
                    <span className="text-xs text-gray-500 mt-1">
                      {new Date(alert.time).toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </span>
                  )}
                </div>
              ))
          ) : (
            <p className="text-sm text-gray-500 text-center">Nenhum alerta</p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
