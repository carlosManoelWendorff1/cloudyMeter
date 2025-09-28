"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Cloud, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

export default function HomePage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return;

    if (!session?.accessToken) {
      router.push("/login");
    }
  }, [status, session]);

  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-primary-400 to-primary-700 dark:from-primary-50 dark:to-primary-100 py-20 text-neutral-50 dark:text-neutral-900">
        <div className="container mx-auto text-center px-4 flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            <Cloud className="w-12 h-12 " />
            <h1 className="text-4xl md:text-6xl font-bold">CloudyMeter</h1>
          </div>
          <p className="text-lg md:text-2xl max-w-xl">
            Monitore seus sensores em tempo real, com alertas inteligentes e
            visualizações intuitivas.
          </p>
          <Button
            className="bg-neutral-50 text-primary-700 hover:bg-primary-50 mt-6 transition-colors"
            onClick={() => router.push("/dashboard")}
          >
            Go to Dashboard
          </Button>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 bg-primary-50 dark:bg-primary-50 flex-1">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">
            Recursos Principais
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-neutral-50 p-6 rounded-2xl shadow hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2 text-primary-600">
                Monitoramento em Tempo Real
              </h3>
              <p className="text-neutral-600">
                Visualize dados atualizados instantaneamente e acompanhe o
                status de todos os seus sensores.
              </p>
            </div>
            <div className="bg-neutral-50 p-6 rounded-2xl shadow hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2 text-primary-600">
                Alertas Inteligentes
              </h3>
              <p className="text-neutral-600">
                Configure alertas automáticos para quando algum sensor
                ultrapassar limites críticos.
              </p>
            </div>
            <div className="bg-neutral-50 p-6 rounded-2xl shadow hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2 text-primary-600">
                Interface Intuitiva
              </h3>
              <p className="text-neutral-600">
                Acompanhe todos os sensores de forma simples, com gráficos
                claros e controles fáceis de usar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-700  dark:bg-primary-50 text-neutral-50 dark:text-neutral-900 py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <span className="text-sm mb-2 md:mb-0">
            &copy; {new Date().getFullYear()} CloudyMeter. Todos os direitos
            reservados.
          </span>
          <div className="flex gap-4">
            <a
              href="https://github.com/carlosManoelWendorff1/cloudyMeter"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-300 transition-colors"
              aria-label="GitHub do projeto"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/carlos-manoel-wendorff-66b875228"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-300 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
