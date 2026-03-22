import { Button, Card, Form, Input, InputNumber } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import React from "react";

const FORM_LIST_NAME = "items";

export const OrderItemsSection: React.FC = () => {
  return (
    <Card title="Order items" style={{ width: "100%" }}>
      <div style={{ maxWidth: 720, marginInline: "auto" }}>
        <Form.List name={FORM_LIST_NAME}>
          {(fields, { add, remove }) => (
            <div style={{ display: "flex", rowGap: 16, flexDirection: "column" }}>
              {fields.map((field) => (
                <Card
                  size="small"
                  title={`Item ${field.name + 1}`}
                  key={field.key}
                  extra={
                    <CloseOutlined
                      onClick={() => remove(field.name)}
                      style={{ color: "#ff4d4f", fontSize: 14, cursor: "pointer" }}
                    />
                  }
                >
                  <Form.Item
                    label="Description"
                    name={[field.name, "description"]}
                    rules={[{ required: true, message: "Required" }]}
                  >
                    <Input placeholder="Item description" />
                  </Form.Item>
                  <Form.Item
                    label="Quantity"
                    name={[field.name, "quantity"]}
                    rules={[{ required: true, message: "Required" }]}
                  >
                    <InputNumber min={1} placeholder="1" style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item
                    label="Unit price"
                    name={[field.name, "unitPrice"]}
                    rules={[{ required: true, message: "Required" }]}
                  >
                    <InputNumber min={0} step={0.01} placeholder="0.00" style={{ width: "100%" }} />
                  </Form.Item>
                </Card>
              ))}

              <Button type="dashed" onClick={() => add()} block>
                + Add Item
              </Button>
            </div>
          )}
        </Form.List>
      </div>
    </Card>
  );
};
