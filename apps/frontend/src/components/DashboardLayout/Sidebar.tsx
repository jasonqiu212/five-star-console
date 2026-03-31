import React, { useState } from "react";
import { Layout, Menu, Typography, Space, Button, Flex } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router";
import Logo from "../../assets/logo.png";
import { SIDEBAR_MENU_ITEMS } from "./constants";
import { useTheme } from "@/features/theme";

const { Sider } = Layout;

export const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark } = useTheme();

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  return (
    <Sider
      width={240}
      collapsedWidth={60}
      collapsed={collapsed}
      style={{
        background: isDark ? "#141414" : "#fff",
        borderRight: `1px solid ${isDark ? "#303030" : "#f0f0f0"}`,
        padding: "16px 12px",
      }}
    >
      <Flex
        vertical
        align={collapsed ? "center" : "start"}
        gap="middle"
        style={{ width: "100%", height: "100%" }}
      >
        <Space align="center" style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
          <img
            src={Logo}
            alt="Five Star Console"
            height={32}
            style={{
              display: "block",
              backgroundColor: isDark ? "#fff" : "transparent",
              borderRadius: 16,
            }}
          />
          {!collapsed && (
            <Typography.Text style={{ fontSize: 16 }}>
              Five Star <span style={{ fontWeight: 700 }}>Console</span>
            </Typography.Text>
          )}
        </Space>

        <div style={{ flex: 1, overflow: "auto", width: "100%" }}>
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            items={SIDEBAR_MENU_ITEMS}
            onClick={handleMenuClick}
            style={{ border: 0 }}
            inlineCollapsed={collapsed}
            defaultOpenKeys={SIDEBAR_MENU_ITEMS.map((item) => item?.key as string)}
          />
        </div>

        <Flex justify="center" style={{ width: "100%" }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
        </Flex>
      </Flex>
    </Sider>
  );
};
