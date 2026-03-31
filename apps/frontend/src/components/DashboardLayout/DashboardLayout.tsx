import { Grid, Layout, Typography } from "antd";
import React, { useState } from "react";
import { Outlet, useLocation } from "react-router";

import { PAGE_TITLES } from "./constants";
import { DrawerMenu } from "./DrawerMenu";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { useTheme } from "@/features/theme";

const { Content } = Layout;
const { Title } = Typography;

export const DashboardLayout: React.FC = () => {
  const screens = Grid.useBreakpoint();
  const isMobile = !screens.md;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isDark } = useTheme();
  const pageTitle = PAGE_TITLES[location.pathname] ?? "";

  return (
    <Layout style={{ height: "100vh" }}>
      {!isMobile && <Sidebar />}
      <Layout>
        <Header isMobile={isMobile} onMobileMenuToggle={() => setMobileMenuOpen(true)} />
        <Content
          style={{
            backgroundColor: isDark ? "#050505" : "#f6f6f6",
            paddingInline: 12,
            overflow: "auto",
          }}
        >
          {isMobile && pageTitle ? (
            <Title level={1} style={{ marginBlock: 16, fontSize: 22 }}>
              {pageTitle}
            </Title>
          ) : null}
          <Outlet />
        </Content>
      </Layout>
      {isMobile && <DrawerMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />}
    </Layout>
  );
};
