import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { Sidebar } from "@/components/dashboard/sidebar";
import { TopNav } from "@/components/dashboard/top-nav";
import { getDictionary, hasLocale, type Locale } from "../dictionaries";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const user = await getCurrentUser();

  if (!user) {
    redirect(`/${lang}/login`);
  }

  const dict = await getDictionary(lang as Locale);

  return (
    <div className="bg-background flex min-h-screen">
      <Sidebar navDict={dict.nav} />
      <div className="flex flex-1 flex-col">
        <TopNav user={user} navDict={dict.nav} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
