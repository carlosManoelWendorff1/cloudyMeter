"use client";

import { useRouter } from "next/navigation";
import { Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-primary-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 px-4">
      <Cloud className="w-16 h-16 mb-6 text-primary-600 dark:text-primary-300" />
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Página não encontrada
      </h2>
      <p className="text-center mb-8 max-w-md">
        A página que você está procurando não existe ou foi movida.
      </p>
      <Button
        className="bg-primary-600 text-white hover:bg-primary-500 dark:bg-primary-300 dark:text-neutral-900 dark:hover:bg-primary-400 transition-colors"
        onClick={() => router.push("/")}
      >
        Voltar para Home
      </Button>
    </div>
  );
}
