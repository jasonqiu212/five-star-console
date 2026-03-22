import { Button, Form, message, Space } from "antd";
import React from "react";

import type { OrderFormValues } from "../../types";
import { BasicInformationSection } from "./BasicInformationSection";
import { InvoiceSection } from "./InvoiceSection";
import { OrderItemsSection } from "./OrderItemsSection";
import { OrderOptionsCollapse } from "./OrderOptionsCollapse";

export const OrderForm: React.FC = () => {
  const [form] = Form.useForm<OrderFormValues>();

  const onFinish = (_values: OrderFormValues) => {
    message.success("Order submitted!");
    form.resetFields();
  };

  return (
    <Form
      form={form}
      layout="horizontal"
      onFinish={onFinish}
      labelCol={{ span: 4 }}
      initialValues={{ createInvoice: true }}
    >
      <Space vertical style={{ width: "100%" }}>
        <BasicInformationSection />
        <InvoiceSection />
        <OrderItemsSection />
        <OrderOptionsCollapse />
        <Form.Item style={{ textAlign: "right" }}>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Space>
    </Form>
  );
};
