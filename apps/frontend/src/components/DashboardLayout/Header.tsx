import React from "react";
import { Space, Dropdown, Avatar, Typography, Button, Flex, Layout } from "antd";
import { UserOutlined, LogoutOutlined, SettingOutlined, PlusOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useLocation } from "react-router";

const { Title } = Typography;

export const Header: React.FC = () => {
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/") return "Dashboard";
    // Add more route mappings as needed
    const segments = path.split("/").filter(Boolean);
    return segments[0]?.charAt(0).toUpperCase() + segments[0]?.slice(1) || "Dashboard";
  };

  const userMenuItems: MenuProps["items"] = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Settings",
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      danger: true,
    },
  ];

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "logout") {
      console.log("Logout clicked");
      // Add logout logic here
    } else if (key === "profile") {
      console.log("Profile clicked");
      // Navigate to profile
    } else if (key === "settings") {
      console.log("Settings clicked");
      // Navigate to settings
    }
  };

  return (
    <Layout.Header
      style={{
        background: "#fafafa",
        padding: "16px 12px",
        display: "flex",
        alignItems: "center",
        height: 64,
      }}
    >
      <Flex justify="space-between" align="center" style={{ width: "100%" }}>
        <Title level={4} style={{ margin: 0 }}>
          {getPageTitle()}
        </Title>

        <Space size="middle">
          <Button type="primary" icon={<PlusOutlined />}>
            New Order
          </Button>
          <Dropdown
            menu={{ items: userMenuItems, onClick: handleMenuClick }}
            placement="bottomRight"
            arrow
          >
            <Avatar
              icon={<UserOutlined />}
              style={{ backgroundColor: "#1890ff", cursor: "pointer" }}
              size="default"
            />
          </Dropdown>
        </Space>
      </Flex>
    </Layout.Header>
  );
};
