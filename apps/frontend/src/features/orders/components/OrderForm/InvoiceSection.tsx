import { Card, Form, FormInstance, Input, Select, Typography } from "antd";
import React, { useEffect } from "react";
import { InvoiceOrgEntity, InvoiceOrgEntityMeta } from "shared-types";

import type { OrderFormValues } from "../../types";

interface InvoiceSectionProps {
  form: FormInstance<OrderFormValues>;
  nextInvoiceNumbers?: { fiveStarAutoLeather: number; leatherAndStitch: number };
}

export const InvoiceSection: React.FC<InvoiceSectionProps> = ({ form, nextInvoiceNumbers }) => {
  const createInvoice = Form.useWatch("createInvoice", form) ?? true;
  const invoiceEntity = Form.useWatch("invoiceEntity", form);

  useEffect(() => {
    if (!nextInvoiceNumbers) return;
    const entity = invoiceEntity ?? InvoiceOrgEntity.FiveStarAutoLeather;
    const invoiceNumber =
      entity === InvoiceOrgEntity.FiveStarAutoLeather
        ? "FS-" + String(nextInvoiceNumbers.fiveStarAutoLeather)
        : "LS-" + String(nextInvoiceNumbers.leatherAndStitch);
    form.setFieldValue("invoiceNumber", invoiceNumber);
  }, [invoiceEntity, nextInvoiceNumbers, form]);

  return (
    <Card title="Invoice" style={{ width: "100%" }}>
      <div style={{ maxWidth: 850, marginInline: "auto" }}>
        {!createInvoice ? (
          <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
            Invoice creation is off for this order. Turn it back on under{" "}
            <Typography.Text strong>More options</Typography.Text> at the bottom of the form if you
            need an invoice.
          </Typography.Paragraph>
        ) : (
          <>
            <Form.Item
              label="Entity"
              name="invoiceEntity"
              rules={[{ required: createInvoice, message: "Please select an entity" }]}
            >
              <Select options={InvoiceOrgEntityMeta.options} />
            </Form.Item>

            <Form.Item
              label="Invoice number"
              name="invoiceNumber"
              rules={[{ required: createInvoice, message: "Please enter invoice number" }]}
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
