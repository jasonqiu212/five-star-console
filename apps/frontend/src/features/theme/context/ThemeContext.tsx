import React, { createContext, useCallback, useEffect, useState } from "react";
import { ThemeState, ThemeContextValue } from "../types";

const initialState: ThemeState = {
  isDark: true,
};

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [state, setState] = useState<ThemeState>(initialState);

  // Load theme preference from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      setState({ isDark: savedTheme === "dark" });
    }
  }, []);

  // Save theme preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("theme", state.isDark ? "dark" : "light");
  }, [state.isDark]);

  const toggleTheme = useCallback(() => {
    setState((prev) => ({ isDark: !prev.isDark }));
  }, []);

  const setTheme = useCallback((isDark: boolean) => {
    setState({ isDark });
  }, []);

  const value: ThemeContextValue = {
    ...state,
    toggleTheme,
    setTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
