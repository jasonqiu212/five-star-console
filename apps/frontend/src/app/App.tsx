import { ConfigProvider, theme, ThemeConfig } from "antd";
import React from "react";
import { BrowserRouter } from "react-router";

import { AppRouter } from "./AppRouter";
import { AuthProvider } from "../features/auth/context/AuthContext";
import { ThemeProvider, useTheme } from "../features/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const AppContent: React.FC = () => {
  const { isDark } = useTheme();
  const queryClient = new QueryClient();

  const themeConfig: ThemeConfig = {
    algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      colorPrimary: "#596bed",
    },
    components: {
      Menu: {
        itemBg: "transparent",
        subMenuItemBg: "transparent",
      },
    },
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={themeConfig}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </ConfigProvider>
    </QueryClientProvider>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </AuthProvider>
  );
};
