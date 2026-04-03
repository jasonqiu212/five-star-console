import { Button, Form, message, Space } from "antd";
import React, { useMemo } from "react";

import type { OrderFormValues } from "../../types";
import { BasicInformationSection } from "./BasicInformationSection";
import { InvoiceSection } from "./InvoiceSection";
import { OrderItemsSection } from "./OrderItemsSection";
import { OrderOptionsCollapse } from "./OrderOptionsCollapse";
import dayjs from "dayjs";

export const OrderForm: React.FC = () => {
  const [form] = Form.useForm<OrderFormValues>();

  const initialValues = useMemo(() => {
    return {
      orderDate: dayjs(),
      createInvoice: true,
    };
  }, []);

  const onFinish = (_values: OrderFormValues) => {
    message.success("Order submitted successfully");
    form.resetFields();
  };

  return (
    <Form
      form={form}
      layout="horizontal"
      onFinish={onFinish}
      labelCol={{ span: 6 }}
      labelWrap
      initialValues={initialValues}
    >
      <Space vertical style={{ width: "100%" }}>
        <BasicInformationSection />
        <InvoiceSection form={form} />
        <OrderItemsSection form={form} />
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
