"use client";

import { usePathname } from "next/navigation";
import { Search, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageToggle } from "@/components/language-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logoutAction } from "@/app/[lang]/login/actions";
import { MobileSidebar } from "./sidebar";
import { CommandMenu, useCommandMenu } from "./command-menu";

interface TopNavProps {
  user: {
    id: string;
    email: string;
    name: string | null;
  };
}

export function TopNav({ user }: TopNavProps) {
  const pathname = usePathname();
  const lang = pathname.split("/")[1] || "en";
  const { open: commandOpen, setOpen: setCommandOpen } = useCommandMenu();

  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : user.email[0].toUpperCase();
  return (
    <header className="border-border bg-card sticky top-0 z-50 flex h-16 items-center justify-between border-b px-4 md:px-6">
      {/* Left side */}
      <div className="flex items-center gap-2">
        <MobileSidebar />
        {/* Search */}
        <button
          onClick={() => setCommandOpen(true)}
          className="border-input bg-background text-muted-foreground hover:bg-accent hover:text-accent-foreground relative hidden h-9 w-80 items-center justify-start rounded-md border px-3 text-sm transition-colors sm:flex"
        >
          <Search className="mr-2 h-4 w-4" />
          <span>Type a command or search...</span>
          <kbd className="bg-muted text-muted-foreground pointer-events-none absolute top-1/2 right-2 hidden h-5 -translate-y-1/2 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium select-none sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </button>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="bg-primary absolute top-1.5 right-1.5 h-2 w-2 rounded-full" />
        </Button>

        <LanguageToggle />
        <ThemeToggle />

        {/* Separator */}
        <div className="via-border mx-1 h-6 w-px bg-gradient-to-b from-transparent to-transparent" />

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="flex items-center gap-2 p-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">
                  {user.name || "User"}
                </span>
                <span className="text-muted-foreground text-xs">
                  {user.email}
                </span>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive"
              onClick={() => logoutAction(lang)}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <CommandMenu lang={lang} open={commandOpen} setOpen={setCommandOpen} />
    </header>
  );
}
