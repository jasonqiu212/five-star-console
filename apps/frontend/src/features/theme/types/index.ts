export interface ThemeState {
  isDark: boolean;
}

export interface ThemeContextValue extends ThemeState {
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;
}
