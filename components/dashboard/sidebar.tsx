"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/en/dashboard", icon: LayoutDashboard },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="border-border bg-card sticky top-0 flex h-screen w-64 flex-col border-r">
      {/* Logo */}
      <div className="border-border flex h-16 items-center gap-2 border-b px-6">
        <div className="from-primary flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br to-[#5c2d0e]">
          <span className="text-xs font-black text-white">EZC</span>
        </div>
        <span className="text-lg font-bold">EZCommerce</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname.includes(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
