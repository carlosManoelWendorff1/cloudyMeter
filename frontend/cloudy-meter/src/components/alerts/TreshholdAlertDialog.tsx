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
import { useForm, Controller, Form, FormProvider } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";

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
  const [loading, setLoading] = useState(false);

  const form = useForm<Threshold>({
    defaultValues: initialThreshold ?? { min: undefined, max: undefined },
  });

  useEffect(() => {
    const fetchThreshold = async () => {
      setLoading(true);
      const sensor = await apiFetch<Sensor>(
        `/sensors/${sensorId}`,
        "Erro ao buscar thresholds"
      );
      if (sensor) {
        form.reset({
          min: sensor.minThreshold,
          max: sensor.maxThreshold,
        });
      }
      setLoading(false);
    };
    fetchThreshold();
  }, [sensorId, form]);

  const onSubmit = async (values: Threshold) => {
    setLoading(true);
    const request = await apiFetch<Sensor>(
      `/sensors/${sensorId}/thresholds`,
      "Error saving threshold",
      {
        method: "POST",
        body: JSON.stringify({
          minThreshold: values.min,
          maxThreshold: values.max,
          thresholdEnabled: true,
        }),
      }
    );
    setLoading(false);
    if (request?.id) {
      toast.success("Threshold saved successfully", { theme: "colored" });
    } else {
      toast.error("Error saving threshold", { theme: "colored" });
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

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="min"
              render={({ field }: any) => (
                <FormItem>
                  <FormLabel>Mínimo</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Ex: 10"
                      min={-100}
                      value={field.value ?? ""}
                      max={form.getValues("max") ?? 100}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="max"
              render={({ field }: any) => (
                <FormItem>
                  <FormLabel>Máximo</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Ex: 100"
                      min={form.getValues("min") ?? 0}
                      max={100}
                      value={field.value ?? ""}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" disabled={loading}>
                {loading ? <Loader2Icon className="animate-spin" /> : "Salvar"}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
