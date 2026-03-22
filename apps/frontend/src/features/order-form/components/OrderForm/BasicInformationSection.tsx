import { Card, DatePicker, Form, Input } from "antd";
import React from "react";

export const BasicInformationSection: React.FC = () => {
  return (
    <Card title="Basic Information" style={{ width: "100%" }}>
      <div style={{ maxWidth: 720, marginInline: "auto" }}>
        <Form.Item
          label="Order date"
          name="orderDate"
          rules={[{ required: true, message: "Please enter order date" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="PO number" name="poNumber">
          <Input placeholder="Enter PO number" disabled />
        </Form.Item>

        <Form.Item label="Client" name="client">
          <Input placeholder="Enter client" />
        </Form.Item>

        <Form.Item label="Client details" name="clientDetails">
          <Input placeholder="Enter client details" />
        </Form.Item>

        <Form.Item label="Car brand" name="carBrand">
          <Input placeholder="Enter car brand" />
        </Form.Item>

        <Form.Item label="Car model" name="carModel">
          <Input placeholder="Enter car model" />
        </Form.Item>

        <Form.Item label="Car plate" name="carPlate">
          <Input placeholder="Enter car plate" />
        </Form.Item>

        <Form.Item label="Handover date" name="handoverDate">
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
      </div>
    </Card>
  );
};
