import { ConfigProvider, ThemeConfig } from "antd";
import React from "react";
import { BrowserRouter } from "react-router";

import { AppRouter } from "./AppRouter";

export const App: React.FC = () => {
  const themeConfig: ThemeConfig = {
    token: {
      colorPrimary: "#576cf0",
    },
    components: {
      Menu: {
        itemBg: "#f6f6f6",
        subMenuItemBg: "#f6f6f6",
      },
    },
  };

  return (
    <ConfigProvider theme={themeConfig}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </ConfigProvider>
  );
};
