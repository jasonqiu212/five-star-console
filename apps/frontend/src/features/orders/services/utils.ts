import { InvoiceEntity } from "shared-types";
import { getInvoiceNumberPrefix } from "@/features/invoices/services/utils";

export function formatInvoiceNumber(entity: InvoiceEntity, nextValue: number): string {
  return getInvoiceNumberPrefix(entity) + String(nextValue);
}
