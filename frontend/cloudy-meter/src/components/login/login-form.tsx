// components/login/login-form.tsx
"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

type LoginFormValues = {
  name: string;
  password: string;
};

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>();
  const router = useRouter();

  async function onSubmit(data: LoginFormValues) {
    const res = await signIn("credentials", { redirect: false, ...data });
    if (res?.error) console.error("Login error:", res.error);
    else router.push("/");
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl md:text-3xl font-bold text-primary-700">
          Bem-vindo
        </CardTitle>
        <CardDescription>Entre com seu usuário e senha</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <Label htmlFor="name">Usuário</Label>
            <Input
              id="name"
              placeholder="Digite seu usuário"
              {...register("name", { required: "Nome é obrigatório" })}
            />
            {errors.name && (
              <span className="text-sm text-error">{errors.name.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              {...register("password", { required: "Senha é obrigatória" })}
            />
            {errors.password && (
              <span className="text-sm text-error">
                {errors.password.message}
              </span>
            )}
          </div>

          <Button type="submit" className="w-full mt-4" disabled={isSubmitting}>
            {isSubmitting ? "Entrando..." : "Login"}
          </Button>
        </form>
      </CardContent>
    </div>
  );
}
