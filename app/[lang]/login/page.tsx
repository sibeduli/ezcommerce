import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { LanguageToggle } from "@/components/language-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { getDictionary, hasLocale, type Locale } from "../dictionaries";

export default async function LoginPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dict = await getDictionary(lang as Locale);

  return (
    <div className="flex min-h-screen">
      {/* Left side - Branding */}
      <div className="relative hidden w-1/2 bg-gradient-to-br from-[#E8590C] to-[#5C2D0E] lg:flex lg:flex-col lg:justify-center lg:p-12">
        <div>
          <Link href={`/${lang}`} className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">
              <span className="text-sm font-black text-white">EZC</span>
            </div>
            <span className="text-xl font-bold text-white">
              {dict.common.appName}
            </span>
          </Link>

          <blockquote className="mt-8 space-y-2">
            <p className="text-lg text-white/90">
              &ldquo;{dict.login.testimonial}&rdquo;
            </p>
            <footer className="text-sm text-white/70">
              {dict.login.testimonialAuthor}
            </footer>
          </blockquote>
        </div>

        <p className="absolute bottom-12 left-12 text-sm text-white/60">
          {dict.login.copyright}
        </p>
      </div>

      {/* Right side - Login form */}
      <div className="bg-background relative flex w-full flex-col justify-center px-8 lg:w-1/2 lg:px-16 xl:px-24">
        {/* Language and theme toggles */}
        <div className="absolute top-6 right-6 flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
        </div>

        <div className="mx-auto w-full max-w-sm">
          {/* Mobile logo */}
          <div className="mb-8 lg:hidden">
            <Link href={`/${lang}`} className="flex items-center gap-2">
              <div className="from-primary flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br to-[#5C2D0E]">
                <span className="text-xs font-black text-white">EZC</span>
              </div>
              <span className="text-xl font-bold">{dict.common.appName}</span>
            </Link>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">
              {dict.login.title}
            </h1>
            <p className="text-muted-foreground">{dict.login.subtitle}</p>
          </div>

          <form className="mt-8 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{dict.login.email}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={dict.login.emailPlaceholder}
                  autoComplete="email"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">{dict.login.password}</Label>
                  <Link
                    href={`/${lang}/forgot-password`}
                    className="text-primary text-sm font-medium hover:underline"
                  >
                    {dict.login.forgotPassword}
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder={dict.login.passwordPlaceholder}
                  autoComplete="current-password"
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label
                  htmlFor="remember"
                  className="text-muted-foreground text-sm font-normal"
                >
                  {dict.login.rememberMe}
                </Label>
              </div>
            </div>

            <Button type="submit" className="w-full">
              {dict.login.signIn}
            </Button>
          </form>

          <p className="text-muted-foreground mt-8 text-center text-sm">
            {dict.login.noAccount}{" "}
            <Link
              href={`/${lang}/register`}
              className="text-primary font-medium hover:underline"
            >
              {dict.login.signUp}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
