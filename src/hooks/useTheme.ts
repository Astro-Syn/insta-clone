import { useEffect, useState } from "react";

const themes = ["lost-lake", "night", "daylight", "woods"] as const;
type Theme = typeof themes[number];

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem("theme") as Theme) || "lost-lake";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const nextTheme = () => {
    const index = themes.indexOf(theme);
    const next = themes[(index + 1) % themes.length];
    setTheme(next);
  };

  return { theme, setTheme, nextTheme, themes };
}
