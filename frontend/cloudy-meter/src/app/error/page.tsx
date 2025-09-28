"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorProps {
  error?: Error | null; // agora pode ser undefined
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") || null;

  useEffect(() => {
    console.error("Erro capturado:", error);
  }, [error]);

  const errorMessage = error?.message || "Erro desconhecido";

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-error-50 dark:bg-error-900 text-error-900 dark:text-error-50 px-4">
      <AlertCircle className="w-16 h-16 mb-6" />
      <h1 className="text-4xl font-bold mb-4">Ocorreu um erro</h1>
      <p className="text-center mb-4 max-w-md">
        Algo deu errado ao carregar a página.
      </p>
      {/* Descrição do erro */}
      <p className="text-center mb-8 max-w-md text-sm text-red-700 dark:text-red-300">
        {errorMessage}
      </p>
      <div className="flex gap-4">
        <Button
          className="bg-error-600 text-neutral-50 hover:bg-error-500 dark:bg-error-400 dark:text-neutral-900 dark:hover:bg-error-300 transition-colors"
          onClick={() => router.push("/")}
        >
          Voltar para Home
        </Button>
        <Button
          className="bg-error-300 text-error-900 hover:bg-error-400 dark:bg-error-700 dark:text-neutral-50 dark:hover:bg-error-600 transition-colors"
          onClick={() => {
            if (nextPath) {
              router.push(nextPath);
            } else {
              reset();
            }
          }}
        >
          Tentar Novamente
        </Button>
      </div>
    </div>
  );
}
