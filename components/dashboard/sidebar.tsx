"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PanelLeftClose,
  PanelLeft,
  Menu,
  Store,
  ShoppingCart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "E-Shop", href: "/shop", icon: Store },
  { name: "Cart", href: "/cart", icon: ShoppingCart },
];

function SidebarContent({
  collapsed,
  setCollapsed,
  onClose,
  isMobile = false,
}: {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  onClose?: () => void;
  isMobile?: boolean;
}) {
  const pathname = usePathname();

  return (
    <>
      {/* Logo & Toggle */}
      <div className="border-border flex h-16 items-center justify-between border-b px-3">
        <div
          className={cn(
            "flex items-center gap-2",
            collapsed && "w-full justify-center"
          )}
        >
          <div className="from-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br to-[#5c2d0e]">
            <span className="text-xs font-black text-white">EZC</span>
          </div>
          {!collapsed && <span className="text-lg font-bold">EZCommerce</span>}
        </div>
        {!collapsed && !isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={() => setCollapsed(true)}
          >
            <PanelLeftClose className="h-4 w-4" />
          </Button>
        )}
        {isMobile && onClose && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={onClose}
          >
            <PanelLeftClose className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Expand button when collapsed */}
      {collapsed && !isMobile && (
        <div className="flex justify-center py-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setCollapsed(false)}
          >
            <PanelLeft className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Navigation */}
      <nav className={cn("flex-1 space-y-1", collapsed ? "px-2 py-2" : "p-4")}>
        {navigation.map((item) => {
          const lang = pathname.split("/")[1] || "en";
          const fullHref = `/${lang}${item.href}`;
          const isActive = pathname.includes(item.href);
          const linkContent = (
            <Link
              href={fullHref}
              onClick={onClose}
              className={cn(
                "flex items-center rounded-lg text-sm font-medium transition-colors",
                collapsed ? "justify-center p-2" : "gap-3 px-3 py-2",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && item.name}
            </Link>
          );

          if (collapsed && !isMobile) {
            return (
              <Tooltip key={item.name}>
                <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                <TooltipContent side="right">
                  <p>{item.name}</p>
                </TooltipContent>
              </Tooltip>
            );
          }

          return <div key={item.name}>{linkContent}</div>;
        })}
      </nav>
    </>
  );
}

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "border-border bg-card sticky top-0 hidden h-screen flex-col border-r transition-all duration-300 md:flex",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <SidebarContent collapsed={collapsed} setCollapsed={setCollapsed} />
    </aside>
  );
}

export function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0" showCloseButton={false}>
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <div className="bg-card flex h-full flex-col">
          <SidebarContent
            collapsed={false}
            setCollapsed={() => {}}
            onClose={() => setOpen(false)}
            isMobile
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
