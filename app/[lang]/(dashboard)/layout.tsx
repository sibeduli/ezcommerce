import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { Sidebar } from "@/components/dashboard/sidebar";
import { TopNav } from "@/components/dashboard/top-nav";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const user = await getCurrentUser();

  if (!user) {
    redirect(`/${lang}/login`);
  }

  return (
    <div className="bg-background flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <TopNav user={user} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
