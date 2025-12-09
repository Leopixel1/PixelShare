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
    
    // Check if user prefers dark mode
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set light mode variables (always set for SSR and light mode)
    root.style.setProperty("--primary", isDarkMode ? theme.colors.primaryDark : theme.colors.primary);
    root.style.setProperty("--secondary", isDarkMode ? theme.colors.secondaryDark : theme.colors.secondary);
    root.style.setProperty("--accent", isDarkMode ? theme.colors.accentDark : theme.colors.accent);
    root.style.setProperty("--background", isDarkMode ? theme.colors.backgroundDark : theme.colors.background);
    root.style.setProperty("--foreground", isDarkMode ? theme.colors.foregroundDark : theme.colors.foreground);
    root.style.setProperty("--gradient-from", isDarkMode ? theme.colors.gradientFromDark : theme.colors.gradientFrom);
    root.style.setProperty("--gradient-via", isDarkMode ? theme.colors.gradientViaDark : theme.colors.gradientVia);
    root.style.setProperty("--gradient-to", isDarkMode ? theme.colors.gradientToDark : theme.colors.gradientTo);
    
    // Listen for changes in color scheme preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      const isDark = e.matches;
      root.style.setProperty("--primary", isDark ? theme.colors.primaryDark : theme.colors.primary);
      root.style.setProperty("--secondary", isDark ? theme.colors.secondaryDark : theme.colors.secondary);
      root.style.setProperty("--accent", isDark ? theme.colors.accentDark : theme.colors.accent);
      root.style.setProperty("--background", isDark ? theme.colors.backgroundDark : theme.colors.background);
      root.style.setProperty("--foreground", isDark ? theme.colors.foregroundDark : theme.colors.foreground);
      root.style.setProperty("--gradient-from", isDark ? theme.colors.gradientFromDark : theme.colors.gradientFrom);
      root.style.setProperty("--gradient-via", isDark ? theme.colors.gradientViaDark : theme.colors.gradientVia);
      root.style.setProperty("--gradient-to", isDark ? theme.colors.gradientToDark : theme.colors.gradientTo);
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
