import { Layout } from "antd";
import React from "react";
import { Outlet } from "react-router";

import { Sidebar } from "./Sidebar";
import { Header as HeaderLayout } from "./Header";

const { Content } = Layout;

export const DashboardLayout: React.FC = () => {
  return (
    <Layout style={{ height: "100vh" }}>
      <Sidebar />
      <Layout>
        <HeaderLayout />
        <Content
          style={{
            backgroundColor: "#fafafa",
            padding: "24px",
            overflow: "auto",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
