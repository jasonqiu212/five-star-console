import { Card, Form, Input, Typography } from "antd";
import React from "react";

import type { OrderFormValues } from "../../types";

export const InvoiceSection: React.FC = () => {
  const form = Form.useFormInstance<OrderFormValues>();
  const createInvoice = Form.useWatch("createInvoice", form) ?? true;

  return (
    <Card title="Invoice" style={{ width: "100%" }}>
      <div style={{ maxWidth: 720, marginInline: "auto" }}>
        {!createInvoice ? (
          <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
            Invoice creation is off for this order. Turn it back on under{" "}
            <Typography.Text strong>More options</Typography.Text> at the bottom of the form if you need an
            invoice.
          </Typography.Paragraph>
        ) : (
          <>
            <Form.Item
              label="Invoice number"
              name="invoiceNumber"
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!getFieldValue("createInvoice")) {
                      return Promise.resolve();
                    }
                    if (value === undefined || value === null || String(value).trim() === "") {
                      return Promise.reject(new Error("Please enter invoice number"));
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input placeholder="Enter invoice number" disabled />
            </Form.Item>

            <Form.Item label="Billing comments" name="billingComments">
              <Input.TextArea rows={3} placeholder="Enter billing comments" />
            </Form.Item>
          </>
        )}
      </div>
    </Card>
  );
};
