import { useState } from "react";
import { Layout, Menu, Button, Card, Typography, Space, theme } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;
const { Title, Paragraph } = Typography;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: collapsed ? "18px" : "24px",
            fontWeight: "bold",
          }}
        >
          {collapsed ? "AH" : "Admin Hub"}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <HomeOutlined />,
              label: "Dashboard",
            },
            {
              key: "2",
              icon: <UserOutlined />,
              label: "Users",
            },
            {
              key: "3",
              icon: <SettingOutlined />,
              label: "Settings",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <Title level={2}>Welcome to Admin Hub</Title>
            <Card title="Getting Started" bordered={false}>
              <Paragraph>
                This is a monorepo setup with React, TypeScript, Ant Design, and Vite for the
                frontend.
              </Paragraph>
              <Paragraph>
                The backend is powered by Express and TypeScript, providing a robust API layer.
              </Paragraph>
            </Card>
            <Card title="Features" bordered={false}>
              <ul>
                <li>React 18 with TypeScript</li>
                <li>Ant Design component library</li>
                <li>Vite for fast development</li>
                <li>Express backend with TypeScript</li>
                <li>ESLint & Prettier for code quality</li>
                <li>pnpm workspace for monorepo management</li>
              </ul>
            </Card>
          </Space>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
