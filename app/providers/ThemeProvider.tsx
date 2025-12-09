"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Theme, getTheme } from "@/lib/themes";

interface ThemeContextType {
  theme: Theme;
  isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: getTheme("default"),
  isLoading: true,
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getTheme("default"));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch the current theme from the API
    fetch("/api/theme")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.theme) {
          setTheme(data.theme);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch theme:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    // Apply theme colors as CSS variables
    const root = document.documentElement;
    
    root.style.setProperty("--primary", theme.colors.primary);
    root.style.setProperty("--primary-dark", theme.colors.primaryDark);
    root.style.setProperty("--secondary", theme.colors.secondary);
    root.style.setProperty("--secondary-dark", theme.colors.secondaryDark);
    root.style.setProperty("--accent", theme.colors.accent);
    root.style.setProperty("--accent-dark", theme.colors.accentDark);
    root.style.setProperty("--background", theme.colors.background);
    root.style.setProperty("--background-dark", theme.colors.backgroundDark);
    root.style.setProperty("--foreground", theme.colors.foreground);
    root.style.setProperty("--foreground-dark", theme.colors.foregroundDark);
    root.style.setProperty("--gradient-from", theme.colors.gradientFrom);
    root.style.setProperty("--gradient-via", theme.colors.gradientVia);
    root.style.setProperty("--gradient-to", theme.colors.gradientTo);
    root.style.setProperty("--gradient-from-dark", theme.colors.gradientFromDark);
    root.style.setProperty("--gradient-via-dark", theme.colors.gradientViaDark);
    root.style.setProperty("--gradient-to-dark", theme.colors.gradientToDark);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, isLoading }}>
      {children}
    </ThemeContext.Provider>
  );
}
