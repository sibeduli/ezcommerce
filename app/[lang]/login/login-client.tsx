"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { loginAction } from "./actions";

interface LoginFormProps {
  lang: string;
  dict: {
    title: string;
    subtitle: string;
    email: string;
    emailPlaceholder: string;
    password: string;
    passwordPlaceholder: string;
    forgotPassword: string;
    rememberMe: string;
    signIn: string;
    noAccount: string;
    signUp: string;
  };
}

export function LoginForm({ lang, dict }: LoginFormProps) {
  const loginWithLang = loginAction.bind(null, lang);
  const [state, formAction, isPending] = useActionState(loginWithLang, null);

  return (
    <>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">{dict.title}</h1>
        <p className="text-muted-foreground">{dict.subtitle}</p>
      </div>

      <form action={formAction} className="mt-8 space-y-6">
        {state?.error && (
          <div className="bg-destructive/10 text-destructive rounded-lg p-3 text-sm">
            {state.error}
          </div>
        )}

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{dict.email}</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder={dict.emailPlaceholder}
              autoComplete="email"
              required
              disabled={isPending}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">{dict.password}</Label>
              <Link
                href={`/${lang}/forgot-password`}
                className="text-primary text-sm font-medium hover:underline"
              >
                {dict.forgotPassword}
              </Link>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder={dict.passwordPlaceholder}
              autoComplete="current-password"
              required
              disabled={isPending}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="remember" name="remember" disabled={isPending} />
            <Label
              htmlFor="remember"
              className="text-muted-foreground text-sm font-normal"
            >
              {dict.rememberMe}
            </Label>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Signing in..." : dict.signIn}
        </Button>
      </form>

      <p className="text-muted-foreground mt-8 text-center text-sm">
        {dict.noAccount}{" "}
        <Link
          href={`/${lang}/register`}
          className="text-primary font-medium hover:underline"
        >
          {dict.signUp}
        </Link>
      </p>
    </>
  );
}
