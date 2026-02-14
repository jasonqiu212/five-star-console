import React, { useState } from "react";
import { Layout, Menu, Typography, Space, Button, Flex } from "antd";
import {
  DashboardOutlined,
  DollarOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router";
import Logo from "../../assets/logo.png";

const { Sider } = Layout;

export const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: "/purchase-orders",
      icon: <DashboardOutlined />,
      label: "Purchase Orders",
    },
    // {
    //   key: "/daily-jobs",
    //   icon: <ScheduleOutlined />,
    //   label: "Daily Jobs",
    // },
    // {
    //   key: "/batam-jobs",
    //   icon: <ShopOutlined />,
    //   label: "Batam Jobs",
    // },
    {
      key: "/invoices",
      icon: <DollarOutlined />,
      label: "Invoices",
      children: [
        {
          key: "/five-star-auto-leather-invoices",
          label: "Five Star Auto Leather",
        },
        {
          key: "/leather-and-stitch-invoices",
          label: "Leather & Stitch",
        },
      ],
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  return (
    <Sider
      width={240}
      collapsedWidth={60}
      collapsed={collapsed}
      style={{
        background: "#f6f6f6",
        borderRight: "1px solid #f0f0f0",
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
          <img src={Logo} alt="Five Star Console" height={32} style={{ display: "block" }} />
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
            items={menuItems}
            onClick={handleMenuClick}
            style={{ border: 0 }}
            inlineCollapsed={collapsed}
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
