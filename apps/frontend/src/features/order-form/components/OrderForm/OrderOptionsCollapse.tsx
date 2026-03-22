import { Collapse, Form, Switch, Typography } from "antd";
import React from "react";

/** Rare toggles (e.g. skip invoice). Collapsed by default so the main form stays scannable. */
export const OrderOptionsCollapse: React.FC = () => {
  return (
    <Collapse
      style={{ width: "100%" }}
      items={[
        {
          key: "more",
          label: "More options",
          children: (
            <div style={{ maxWidth: 720, marginInline: "auto" }}>
              <Form.Item label="Create invoice" name="createInvoice" valuePropName="checked">
                <Switch />
              </Form.Item>
              <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
                Turn off only when this order should not generate an invoice. Invoice fields stay in
                the Invoice section when this is on.
              </Typography.Paragraph>
            </div>
          ),
        },
      ]}
    />
  );
};
