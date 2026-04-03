import { Collapse, Form, Switch, Typography } from "antd";
import React from "react";

export const OrderOptionsCollapse: React.FC = () => {
  return (
    <Collapse
      style={{ width: "100%" }}
      items={[
        {
          key: "more",
          label: "More Options",
          children: (
            <div style={{ maxWidth: 850, marginInline: "auto" }}>
              <Form.Item label="Create invoice" name="createInvoice" valuePropName="checked">
                <Switch />
              </Form.Item>
              <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
                Turn off only when this order should not generate an invoice.
              </Typography.Paragraph>
            </div>
          ),
        },
      ]}
    />
  );
};
