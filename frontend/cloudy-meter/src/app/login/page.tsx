// app/login/page.tsx
"use client";

import { LoginForm } from "@/components/login/login-form";
import { Cloud } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen flex w-full flex-col items-center justify-center bg-gradient-to-r from-primary-50 via-primary-100 to-primary-50 animate-gradient-x p-6">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-10">
        <Cloud className="w-12 h-12 text-primary-700" />
        <h1 className="text-4xl md:text-5xl font-bold text-primary-700">
          CloudyMeter
        </h1>
      </div>

      {/* Login Card */}
      <div className="bg-neutral-50 p-10 rounded-2xl shadow-lg w-full max-w-lg">
        <LoginForm />
      </div>
    </div>
  );
}
