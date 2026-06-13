import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem("nayepankh_theme") || "light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("nayepankh_theme", theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () => setTheme((current) => (current === "light" ? "dark" : "light"))
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);

