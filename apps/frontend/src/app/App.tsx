import { ConfigProvider, ThemeConfig } from "antd";
import React from "react";
import { BrowserRouter } from "react-router";

import { AppRouter } from "./AppRouter";
import { AuthProvider } from "../features/auth/context/AuthContext";

export const App: React.FC = () => {
  const themeConfig: ThemeConfig = {
    token: {
      colorPrimary: "#596bed",
    },
    components: {
      Menu: {
        itemBg: "#f6f6f6",
        subMenuItemBg: "#f6f6f6",
      },
    },
  };

  return (
    <AuthProvider>
      <ConfigProvider theme={themeConfig}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </ConfigProvider>
    </AuthProvider>
  );
};
