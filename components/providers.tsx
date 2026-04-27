"use client";

import { ThemeProvider } from "@teispace/next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme={false}
    >
      <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
    </ThemeProvider>
  );
}
