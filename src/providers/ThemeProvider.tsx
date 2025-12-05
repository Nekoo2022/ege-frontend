"use client";

import { PropsWithChildren, useEffect } from "react";
import { ThemeProvider as NextThemeProvider } from "next-themes";

export function ThemeProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    // Если нужно, сбросим сохранённую тему, чтобы использовать системную
    if (localStorage.getItem("theme")) {
      localStorage.removeItem("theme");
    }
  }, []);

  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      enableColorScheme
      disableTransitionOnChange
    >
      {children}
    </NextThemeProvider>
  );
}
