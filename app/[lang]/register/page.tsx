import Link from "next/link";
import { notFound } from "next/navigation";
import { LanguageToggle } from "@/components/language-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { getDictionary, hasLocale, type Locale } from "../dictionaries";
import { RegisterForm } from "./register-client";

export default async function RegisterPage({
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
              &ldquo;{dict.register.testimonial}&rdquo;
            </p>
            <footer className="text-sm text-white/70">
              {dict.register.testimonialAuthor}
            </footer>
          </blockquote>
        </div>

        <p className="absolute bottom-12 left-12 text-sm text-white/60">
          {dict.register.copyright}
        </p>
      </div>

      {/* Right side - Register form */}
      <div className="bg-background relative flex w-full flex-col justify-center overflow-visible px-8 lg:w-1/2 lg:px-16 xl:px-24">
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

          <RegisterForm lang={lang} dict={dict.register} />
        </div>
      </div>
    </div>
  );
}
