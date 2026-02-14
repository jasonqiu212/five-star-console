import React from "react";
import { Dropdown, Avatar, Typography, Button, Flex, Layout } from "antd";
import { LogoutOutlined, PlusOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useLocation } from "react-router";
import { PAGE_TITLES } from "./constants";
import { blue } from "@ant-design/colors";

const { Title } = Typography;

export const Header: React.FC = () => {
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    return PAGE_TITLES[path] || "";
  };

  const userMenuItems: MenuProps["items"] = [
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: () => {
        console.log("logout");
      },
    },
  ];

  return (
    <Layout.Header
      style={{
        background: "#fafafa",
        padding: "16px 12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 64,
      }}
    >
      <Title level={1} style={{ margin: 0, fontSize: 22 }}>
        {getPageTitle()}
      </Title>

      <Flex align="center" gap="middle">
        <Button type="primary" icon={<PlusOutlined />}>
          New Order
        </Button>

        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
          <Flex align="center" gap="small">
            <Avatar size="small" style={{ backgroundColor: blue[6] }}>
              J
            </Avatar>
            <Typography.Text>John Doe</Typography.Text>
          </Flex>
        </Dropdown>
      </Flex>
    </Layout.Header>
  );
};
