import { Button, Card, Flex, Form, Input, message } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../features/auth/hooks/useAuth";

interface LoginFormValues {
  email: string;
  password: string;
}

export const Login: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { loginAction } = useAuth();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: LoginFormValues) => {
    try {
      setLoading(true);
      await loginAction(values);
      message.success("Login successful!");
      navigate("/");
    } catch (error) {
      message.error(
        error instanceof Error ? error.message : "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex justify="center" align="center" style={{ height: "100vh", backgroundColor: "#fafafa" }}>
      <Card title="Log In" style={{ width: 400 }}>
        <Form form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Log In
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Flex>
  );
};
