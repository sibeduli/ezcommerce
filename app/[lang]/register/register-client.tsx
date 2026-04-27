"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { registerAction } from "./actions";

interface RegisterFormProps {
  lang: string;
  dict: {
    title: string;
    subtitle: string;
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    password: string;
    passwordPlaceholder: string;
    confirmPassword: string;
    confirmPasswordPlaceholder: string;
    terms: string;
    signUp: string;
    hasAccount: string;
    signIn: string;
  };
}

export function RegisterForm({ lang, dict }: RegisterFormProps) {
  const registerWithLang = registerAction.bind(null, lang);
  const [state, formAction, isPending] = useActionState(registerWithLang, null);

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
            <Label htmlFor="name">{dict.name}</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder={dict.namePlaceholder}
              autoComplete="name"
              required
              disabled={isPending}
            />
          </div>

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
            <Label htmlFor="password">{dict.password}</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder={dict.passwordPlaceholder}
              autoComplete="new-password"
              required
              disabled={isPending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">{dict.confirmPassword}</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder={dict.confirmPasswordPlaceholder}
              autoComplete="new-password"
              required
              disabled={isPending}
            />
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="terms"
              name="terms"
              disabled={isPending}
              className="mt-0.5"
            />
            <Label
              htmlFor="terms"
              className="text-muted-foreground text-sm leading-snug font-normal"
            >
              {dict.terms}
            </Label>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Creating account..." : dict.signUp}
        </Button>
      </form>

      <p className="text-muted-foreground mt-8 text-center text-sm">
        {dict.hasAccount}{" "}
        <Link
          href={`/${lang}/login`}
          className="text-primary font-medium hover:underline"
        >
          {dict.signIn}
        </Link>
      </p>
    </>
  );
}
