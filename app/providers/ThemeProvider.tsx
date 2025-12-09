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
    // Helper function to apply theme colors based on color scheme
    const applyThemeColors = (isDark: boolean) => {
      const root = document.documentElement;
      root.style.setProperty("--primary", isDark ? theme.colors.primaryDark : theme.colors.primary);
      root.style.setProperty("--secondary", isDark ? theme.colors.secondaryDark : theme.colors.secondary);
      root.style.setProperty("--accent", isDark ? theme.colors.accentDark : theme.colors.accent);
      root.style.setProperty("--background", isDark ? theme.colors.backgroundDark : theme.colors.background);
      root.style.setProperty("--foreground", isDark ? theme.colors.foregroundDark : theme.colors.foreground);
      root.style.setProperty("--gradient-from", isDark ? theme.colors.gradientFromDark : theme.colors.gradientFrom);
      root.style.setProperty("--gradient-via", isDark ? theme.colors.gradientViaDark : theme.colors.gradientVia);
      root.style.setProperty("--gradient-to", isDark ? theme.colors.gradientToDark : theme.colors.gradientTo);
    };
    
    // Check if user prefers dark mode and apply initial colors
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyThemeColors(isDarkMode);
    
    // Listen for changes in color scheme preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      applyThemeColors(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, isLoading }}>
      {children}
    </ThemeContext.Provider>
  );
}
