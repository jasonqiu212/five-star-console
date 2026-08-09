import { InvoicesTable } from "@/features/invoices/components/InvoicesTable";
import { Card } from "antd";
import React from "react";
import { InvoiceEntity } from "shared-types";

export const LeatherAndStitchInvoices: React.FC = () => {
  return (
    <Card size="small" variant="borderless">
      <InvoicesTable entity={InvoiceEntity.LEATHER_AND_STITCH} />
    </Card>
  );
};
