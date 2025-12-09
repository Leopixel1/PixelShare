export interface Theme {
  name: string;
  label: string;
  colors: {
    primary: string;
    primaryDark: string;
    secondary: string;
    secondaryDark: string;
    accent: string;
    accentDark: string;
    background: string;
    backgroundDark: string;
    foreground: string;
    foregroundDark: string;
    gradientFrom: string;
    gradientVia: string;
    gradientTo: string;
    gradientFromDark: string;
    gradientViaDark: string;
    gradientToDark: string;
  };
}

export const themes: Record<string, Theme> = {
  default: {
    name: "default",
    label: "Default Purple",
    colors: {
      primary: "#4f46e5", // indigo-600
      primaryDark: "#6366f1", // indigo-500
      secondary: "#9333ea", // purple-600
      secondaryDark: "#a855f7", // purple-500
      accent: "#06b6d4", // cyan-500
      accentDark: "#22d3ee", // cyan-400
      background: "#ffffff",
      backgroundDark: "#0a0a0a",
      foreground: "#171717",
      foregroundDark: "#ededed",
      gradientFrom: "#f3e8ff", // purple-50
      gradientVia: "#dbeafe", // blue-50
      gradientTo: "#e0e7ff", // indigo-100
      gradientFromDark: "#1f2937", // gray-800
      gradientViaDark: "#1f2937", // gray-800
      gradientToDark: "#312e81", // indigo-900
    },
  },
  ocean: {
    name: "ocean",
    label: "Ocean Blue",
    colors: {
      primary: "#0284c7", // sky-600
      primaryDark: "#0ea5e9", // sky-500
      secondary: "#0891b2", // cyan-600
      secondaryDark: "#06b6d4", // cyan-500
      accent: "#3b82f6", // blue-500
      accentDark: "#60a5fa", // blue-400
      background: "#ffffff",
      backgroundDark: "#0a0a0a",
      foreground: "#171717",
      foregroundDark: "#ededed",
      gradientFrom: "#f0f9ff", // sky-50
      gradientVia: "#e0f2fe", // sky-100
      gradientTo: "#bae6fd", // sky-200
      gradientFromDark: "#1e293b", // slate-800
      gradientViaDark: "#0c4a6e", // sky-900
      gradientToDark: "#164e63", // cyan-900
    },
  },
  forest: {
    name: "forest",
    label: "Forest Green",
    colors: {
      primary: "#16a34a", // green-600
      primaryDark: "#22c55e", // green-500
      secondary: "#15803d", // green-700
      secondaryDark: "#16a34a", // green-600
      accent: "#10b981", // emerald-500
      accentDark: "#34d399", // emerald-400
      background: "#ffffff",
      backgroundDark: "#0a0a0a",
      foreground: "#171717",
      foregroundDark: "#ededed",
      gradientFrom: "#f0fdf4", // green-50
      gradientVia: "#dcfce7", // green-100
      gradientTo: "#bbf7d0", // green-200
      gradientFromDark: "#1f2937", // gray-800
      gradientViaDark: "#14532d", // green-900
      gradientToDark: "#064e3b", // emerald-900
    },
  },
  sunset: {
    name: "sunset",
    label: "Sunset Orange",
    colors: {
      primary: "#ea580c", // orange-600
      primaryDark: "#fb923c", // orange-400
      secondary: "#dc2626", // red-600
      secondaryDark: "#ef4444", // red-500
      accent: "#f59e0b", // amber-500
      accentDark: "#fbbf24", // amber-400
      background: "#ffffff",
      backgroundDark: "#0a0a0a",
      foreground: "#171717",
      foregroundDark: "#ededed",
      gradientFrom: "#fff7ed", // orange-50
      gradientVia: "#fed7aa", // orange-200
      gradientTo: "#fef3c7", // amber-100
      gradientFromDark: "#1f2937", // gray-800
      gradientViaDark: "#7c2d12", // orange-900
      gradientToDark: "#78350f", // amber-900
    },
  },
  rose: {
    name: "rose",
    label: "Rose Pink",
    colors: {
      primary: "#e11d48", // rose-600
      primaryDark: "#fb7185", // rose-400
      secondary: "#be123c", // rose-700
      secondaryDark: "#e11d48", // rose-600
      accent: "#ec4899", // pink-500
      accentDark: "#f472b6", // pink-400
      background: "#ffffff",
      backgroundDark: "#0a0a0a",
      foreground: "#171717",
      foregroundDark: "#ededed",
      gradientFrom: "#fff1f2", // rose-50
      gradientVia: "#fce7f3", // pink-100
      gradientTo: "#fce7f3", // pink-100
      gradientFromDark: "#1f2937", // gray-800
      gradientViaDark: "#881337", // rose-900
      gradientToDark: "#831843", // pink-900
    },
  },
  midnight: {
    name: "midnight",
    label: "Midnight",
    colors: {
      primary: "#6366f1", // indigo-500
      primaryDark: "#818cf8", // indigo-400
      secondary: "#8b5cf6", // violet-500
      secondaryDark: "#a78bfa", // violet-400
      accent: "#06b6d4", // cyan-500
      accentDark: "#22d3ee", // cyan-400
      background: "#ffffff",
      backgroundDark: "#0a0a0a",
      foreground: "#171717",
      foregroundDark: "#ededed",
      gradientFrom: "#1e1b4b", // indigo-950
      gradientVia: "#312e81", // indigo-900
      gradientTo: "#1e3a8a", // blue-900
      gradientFromDark: "#0f172a", // slate-900
      gradientViaDark: "#1e1b4b", // indigo-950
      gradientToDark: "#1e3a8a", // blue-900
    },
  },
};

export function getTheme(themeName: string): Theme {
  return themes[themeName] || themes.default;
}

export function getThemeNames(): string[] {
  return Object.keys(themes);
}
