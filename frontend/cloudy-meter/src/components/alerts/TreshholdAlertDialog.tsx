"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from "../ui/dialog";
import { Loader2Icon, SlidersHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { apiFetch } from "@/lib/api-client";
import { Sensor } from "@/types/sensor";
import { toast } from "react-toastify";
import { set } from "react-hook-form";

type Threshold = {
  min?: number;
  max?: number;
};

interface ThresholdAlertDialogProps {
  sensorId: string;
  initialThreshold?: Threshold;
}

export const ThresholdAlertDialog = ({
  sensorId,
  initialThreshold,
}: ThresholdAlertDialogProps) => {
  const [localThreshold, setLocalThreshold] = useState<Threshold>(
    initialThreshold ?? { min: undefined, max: undefined }
  );

  useEffect(() => {
    const fetchThreshold = async () => {
      setLoading(true);
      const sensor = await apiFetch<Sensor>(
        `/sensors/${sensorId}`,
        "Erro ao buscar thresholds"
      );
      if (sensor) {
        setLocalThreshold({
          min: sensor.minThreshold,
          max: sensor.maxThreshold,
        });
      }
      setLoading(false);
    };
    fetchThreshold();
  }, [sensorId]);
  const [loading, setLoading] = useState(false); // Adicionado estado de loading

  const handleChange = (type: "min" | "max", value: string) => {
    const num = Number(value);
    if (!isNaN(num)) {
      setLocalThreshold((prev) => ({ ...prev, [type]: num }));
    }
  };

  const handleSave = async () => {
    setLoading(true);
    const request = await apiFetch<Sensor>(
      `/sensors/${sensorId}/thresholds`,
      "Error saving threshold",
      {
        method: "POST",
        body: JSON.stringify({
          minThreshold: localThreshold.min,
          maxThreshold: localThreshold.max,
          thresholdEnabled: true,
        }),
      }
    );
    if (request?.id) {
      setLoading(false);
      toast.success("Threshold saved successfully");
    } else {
      setLoading(false);
      toast.error("Error saving threshold");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <SlidersHorizontal className="w-4 h-4 mr-1" />
          Definir alertas
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Definir Alertas</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <div>
            <label className="text-xs text-neutral-500">Mínimo</label>
            <Input
              type="number"
              placeholder="Ex: 10"
              min={-100}
              max={localThreshold.max ?? 100}
              value={localThreshold.min ?? ""}
              onChange={(e) => handleChange("min", e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs text-neutral-500">Máximo</label>
            <Input
              type="number"
              min={localThreshold.min ?? 0}
              max={100}
              placeholder="Ex: 100"
              value={localThreshold.max ?? ""}
              onChange={(e) => handleChange("max", e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSave}>
            {loading ? <Loader2Icon className="animate-spin" /> : "Salvar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
