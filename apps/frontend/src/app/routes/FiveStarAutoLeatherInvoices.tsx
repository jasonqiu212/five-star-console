import { InvoicesTable } from "@/features/invoices/components/InvoicesTable";
import { Card } from "antd";
import React from "react";
import { InvoiceEntity } from "shared-types";

export const FiveStarAutoLeatherInvoices: React.FC = () => {
  return (
    <Card size="small" variant="borderless">
      <InvoicesTable entity={InvoiceEntity.FIVE_STAR_AUTO_LEATHER} />
    </Card>
  );
};
