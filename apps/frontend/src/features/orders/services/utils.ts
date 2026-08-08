import { InvoiceOrgEntity } from "shared-types";

export function formatInvoiceNumber(entity: InvoiceOrgEntity, nextValue: number): string {
  const prefix = entity === InvoiceOrgEntity.LEATHER_AND_STITCH ? "LS-" : "FS-";
  return prefix + String(nextValue);
}
